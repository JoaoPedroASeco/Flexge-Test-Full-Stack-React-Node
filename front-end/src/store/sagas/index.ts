import { all } from 'redux-saga/effects'
import user from './user'
import student from './students'

export default function* rootSaga(): Generator<any> {
  return yield all([
    user,
    student
  ])
}