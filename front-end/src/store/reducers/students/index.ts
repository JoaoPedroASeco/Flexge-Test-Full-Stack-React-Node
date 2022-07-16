import { IStudentsPayload } from '../../actions'
import * as types from '../../types/students'

export interface studentState {
  payload: IStudentsPayload
  loading: boolean
  success: boolean
  error: string
}

const initialState: studentState = {
  payload: {},
  loading: false,
  success: false,
  error: ''
}

export const studentReducer = (state = initialState, action: {
  type: string,
  payload: IStudentsPayload
}) => {
  switch(action.type) {
    // Read
    case types.READ_STUDENT_REQUEST: 
      return {
        ...state,
        loading: true,
        error: '',
        success: false
      }
    case types.READ_STUDENT_SUCCESS: 
      return {
        ...state,
        payload: action.payload,
        loading: false,
        error: '',
        success: true
      }
    case types.READ_STUDENT_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }
    // Create
    case types.CREATE_STUDENT_REQUEST: 
      return {
        ...state,
        loading: true,
        error: '',
        success: false
      }
    case types.CREATE_STUDENT_SUCCESS: 
      return {
        ...state,
        loading: false,
        error: '',
        success: true
      }
    case types.CREATE_STUDENT_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }
    // Update
    case types.UPDATE_STUDENT_REQUEST: 
      return {
        ...state,
        loading: true,
        error: '',
        success: false
      }
    case types.UPDATE_STUDENT_SUCCESS: 
      return {
        ...state,
        loading: false,
        error: '',
        success: true
      }
    case types.UPDATE_STUDENT_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }
    // Delete
    case types.DELETE_STUDENT_REQUEST: 
      return {
        ...state,
        loading: true,
        error: '',
        success: false
      }
    case types.DELETE_STUDENT_SUCCESS: 
      return {
        ...state,
        payload: {
          students: action.payload
        },
        loading: false,
        error: '',
        success: true
      }
    case types.DELETE_STUDENT_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }
    default: return state
  }
}