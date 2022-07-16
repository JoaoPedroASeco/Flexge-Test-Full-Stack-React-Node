import { createStudentFailure, createStudentSuccess, deleteStudentFailure, deleteStudentSuccess, IStudent, IStudentsPayload, readStudentFailure, readStudentSuccess, updateStudentFailure, updateStudentSuccess } from '../../actions'
import { call, put } from '@redux-saga/core/effects'
import { all, takeLatest } from 'redux-saga/effects'
import * as types from '../../types/students'
import { tokenService } from '../../../services/token/tokenService'
import { api } from '../../../services/api'

// Read Variables
let readSuccess: IStudentsPayload
let readError: string

const readStudentRequest = async ({ page, order }: { page: number, order: 1 | -1 }) => {
  const token = await tokenService.get()

  try {
    const { data } = await api.post('/list-student',
      {
        page,
        sort: order
      },
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    )
    
    readSuccess = data

    return true
  } catch (error) {
    readError = 'Read student error'

    throw error
  }
}

// Create Variables
let createError: string

const createStudentRequest = async ({ payload }: { payload: IStudent }) => {
  const token = await tokenService.get()

  try {
    await api.post('/student',
      {
        name: payload.name,
        course: payload.course,
        age: payload.age,
        school: payload.school,
      },
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    )
  } catch (error) {
    createError = 'Create student error'

    throw error
  }
}

// Update Variables
let updateError: string

const updateStudentRequest = async ({ payload }: { payload: IStudent }) => {

  const token = await tokenService.get()

  try {
    const { data } = await api.put('/student',
      {
        _id: payload._id,
        name: payload.name,
        course: payload.course,
        age: payload.age,
        school: payload.school,
      },
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    )

  } catch (error) {
    updateError = 'Update student error'

    throw error
  }
}

// Delete Variables
let deleteSuccess: IStudent[]
let deleteError: string

const deleteStudentRequest = async ({ _id, payload }: { _id: string, payload: IStudent[]}) => {
  const token = await tokenService.get()

  try {
    const { data } = await api.delete('/student',
      {
        data: { _id },
        headers: { 'Authorization': `Bearer ${token}` }
      },
    )

    deleteSuccess = payload

    return true
  } catch (error) {
    deleteError = 'Delete student error'

    throw error
  }
}

export function* readStudentData(action: { type: string, payload: { page: number, order: 1 | -1} }) {
  try {
    yield call(readStudentRequest, ({ order: action.payload.order, page: action.payload.page }))
    yield put(readStudentSuccess({ payload: readSuccess }))
  } catch (err) {
    yield put(readStudentFailure(readError))
  }
}

export function* createStudentData(action: { type: string, payload: IStudent }) {
  try {
    yield call(createStudentRequest, ({ payload: action.payload }))
    yield put(createStudentSuccess())
  } catch (err) {
    yield put(createStudentFailure(createError))
  }
}

export function* updateStudentData(action: { type: string, payload: IStudent }) {
  try {
    yield call(updateStudentRequest, ({ payload: action.payload }))
    yield put(updateStudentSuccess())
  } catch (error) {
    yield put(updateStudentFailure(updateError))
  }
}

export function* deleteStudentData(action: { type: string, payload: { _id: string, payload: IStudent[]}}) {
  try {
    yield call(deleteStudentRequest, ({ _id: action.payload._id, payload: action.payload.payload }))
    yield put(deleteStudentSuccess({ payload: deleteSuccess }))
  } catch (error) {
    yield put(deleteStudentFailure(deleteError))
  }
}

export default all([
  takeLatest(types.READ_STUDENT_REQUEST, readStudentData),
  takeLatest(types.CREATE_STUDENT_REQUEST, createStudentData),
  takeLatest(types.UPDATE_STUDENT_REQUEST, updateStudentData),
  takeLatest(types.DELETE_STUDENT_REQUEST, deleteStudentData),
])