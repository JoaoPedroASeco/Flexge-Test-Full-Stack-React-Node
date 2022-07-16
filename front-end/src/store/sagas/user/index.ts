import { getUserFailure, getUserSuccess, UserRequestType, UserFailureType } from '../../actions'
import { call, put } from '@redux-saga/core/effects'
import { all, takeLatest } from 'redux-saga/effects'
import * as types from '../../types/user'

import { tokenService } from '../../../services/token/tokenService'
import { api } from '../../../services/api'

let userRequestFailure: UserFailureType

const userRequest = async ({ email, password }: UserRequestType) => {
  try {
    const { data } = await api.post('/login', { email, password })
    
    if (data.token && data.token.length > 0) {
      userRequestFailure = {
        message: '',
        status: ''
      }

      tokenService.save(data.token);

      return true
    } else {
      userRequestFailure = data
    }
  } catch (error) {
    return false
  }
}

export function* userData(action: { type: string, payload: UserRequestType }) {
  try {
    yield call(userRequest, action.payload)

    if (!userRequestFailure || userRequestFailure.message.length <= 0 ) {
      yield put(getUserSuccess())
    } else {
      yield put(getUserFailure(userRequestFailure))
    }
  } catch (error) {
    yield put(getUserFailure(userRequestFailure))
  }
}

export default all([takeLatest(types.GET_USER_REQUEST, userData)])