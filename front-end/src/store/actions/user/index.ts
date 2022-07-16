import * as types from '../../types/user'

export type UserRequestType = {
  password: string
  email: string
}

export type UserFailureType = {
  message: string
  status: string
}

export function getUserRequest({ email, password }: UserRequestType): { type: string, payload: UserRequestType } {
  return {
    type: types.GET_USER_REQUEST,
    payload: {
      password,
      email
    }
  }
}

export function getUserSuccess(): {
  type: string
} {
  return {
    type: types.GET_USER_SUCCESS,
  }
}

export function getUserFailure({ message, status }: UserFailureType): {
  type: string
  payload: UserFailureType
} {
  return {
    type: types.GET_USER_FAILURE,
    payload: {
      status,
      message
    }
  }
}