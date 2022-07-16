import * as types from '../../types/students'

export interface IStudentsPayload {
  tota?: number
  page?: number
  totalPages?: number
  order: 1 | -1
  students?: {
    _id?: string
    name?: string
    age?: number
    course?: string
    school?: string
  }[]
}

export interface IStudent {
  _id?: string
  name?: string
  age?: number
  course?: string
  school?: string
}

// Read
export function readStudentRequest({ page, order = 1 }: { page: number, order?: 1 | -1 }): {
  type: string,
  payload: {
    page: number
    order: 1 | -1
  }
} {
  return {
    type: types.READ_STUDENT_REQUEST,
    payload: {
      page,
      order
    }
  }
}

export function readStudentSuccess({ payload }: { payload: IStudentsPayload }): {
  type: string
  payload: IStudentsPayload
} {
  return {
    type: types.READ_STUDENT_SUCCESS,
    payload
  }
}

export function readStudentFailure(readError: string): {
  type: string
  payload: string
} {
  return {
    type: types.READ_STUDENT_FAILURE,
    payload: readError
  }
}

// Create
export function createStudentRequest({ name, age, course, school }: IStudent) : { type: string, payload: IStudent } {
  return {
    type: types.CREATE_STUDENT_REQUEST,
    payload: { name, age, course, school }
  }
}

export function createStudentSuccess(): {
  type: string
} {
  return {
    type: types.CREATE_STUDENT_SUCCESS,
  }
}

export function createStudentFailure(createError: string): {
  type: string
  payload: string
} {
  return {
    type: types.CREATE_STUDENT_FAILURE,
    payload: createError
  }
}

// Update
export function updateStudentRequest({ _id, name, age, course, school }: IStudent) : { type: string, payload: IStudent } {
  return {
    type: types.UPDATE_STUDENT_REQUEST,
    payload: { _id, name, age, course, school }
  }
}

export function updateStudentSuccess(): {
  type: string
} {
  return {
    type: types.UPDATE_STUDENT_SUCCESS,
  }
}

export function updateStudentFailure(updateError: string): {
  payload: string
  type: string
} {
  return {
    type: types.UPDATE_STUDENT_FAILURE,
    payload: updateError
  }
}

// Delete
export function deleteStudentRequest({ _id, payload }: { _id: string, payload: IStudent[] }): { type: string, payload: {_id: string, payload: IStudent[] }} {
  return {
    type: types.DELETE_STUDENT_REQUEST,
    payload: {
      _id,
      payload,
    }
  }
}

export function deleteStudentSuccess({ payload }: { payload: IStudent[] }): {
  type: string
  payload: IStudent[]
} {
  return {
    type: types.DELETE_STUDENT_SUCCESS,
    payload: payload
  }
}

export function deleteStudentFailure(deleteError: string): {
  payload: string
  type: string
} {
  return {
    type: types.DELETE_STUDENT_FAILURE,
    payload: deleteError
  }
}