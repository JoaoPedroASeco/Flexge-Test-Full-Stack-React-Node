// Redux import
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { createStore, applyMiddleware, Store, AnyAction } from 'redux'
// Redux Saga
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
// Types
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// Create Saga middleware
const sagaMiddleware = createSagaMiddleware()

const store: Store<unknown, AnyAction> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store

// Typing Selector of States
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Typing Dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Exporting all actions and types
export * from './actions'
export * from './types/user'