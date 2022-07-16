import { UserFailureType } from "../../actions";
import * as types from '../../types/user'

export interface UserState {
  loading?: boolean
  error?: UserFailureType
  success: boolean
}

const initialState: UserState = {
  loading: false,
  success: false,
  error: {
    status: '',
    message: ''
  }
}

export const userReducer = (state = initialState, action: {
  type: string,
  payload: UserFailureType
}) => {
  switch(action.type) {
    case types.GET_USER_REQUEST: 
      return {
        ...state,
        loading: true,
        error: '',
        success: false
      }
    case types.GET_USER_SUCCESS: 
      return {
        ...state,
        loading: false,
        error: '',
        success: true
      }
    case types.GET_USER_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      }
    default: return state
  }
}