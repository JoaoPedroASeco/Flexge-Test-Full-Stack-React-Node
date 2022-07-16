import { combineReducers } from "redux"
import { userReducer } from "./user"
import { studentReducer } from './students'

const rootReducer = combineReducers({
  user: userReducer,
  student: studentReducer
})

export default rootReducer