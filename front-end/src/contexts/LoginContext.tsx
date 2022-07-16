// React Import
import { createContext, FormEvent, ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserRequest, useAppDispatch, useAppSelector } from "../store"
import { UserState } from "../store/reducers/user"

// Set initial values for context
interface ILoginContext {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  error: boolean
  setError: (error: boolean) => void
  success: boolean
  setSuccess: (success: boolean) => void
  handleLogin: (e: FormEvent) => void
}

// Creating login context
export const LoginContext = createContext({} as ILoginContext)

// Creating login provider
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  // React Navigate
  const router = useNavigate()

  // Using State of Redux
  const userState = useAppSelector<UserState>(state => state.user)

  // Using dispatch from Redux
  const dispatch = useAppDispatch()

  // Using State
  const [email, setEmail] = useState('user@gmail.com')
  const [password, setPassword] = useState('123')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    // Block reloads on form submit
    e.preventDefault()

    // Reset Error
    setError(false)

    // Prevent input filed are not void
    if(!email || email === '' || !password || password === '') return setError(true)

    // User Login
    dispatch(getUserRequest({ email, password }))
  }

  useEffect(() => {
    // If get success in login request
    if(userState.success === true) {  // Redirecting to Student page
      setSuccess(true)

      setTimeout(() => router("/students"), 1200)

      setSuccess(false)
    }
    
    // If get error in login request
    if (userState.error?.status && userState.error?.status.length > 0) {
      setError(true)
    }
  }, [handleLogin])

  return (
    <LoginContext.Provider value={{
      email,
      setEmail,
      password,
      setPassword,
      error,
      setError,
      success,
      setSuccess,
      handleLogin
    }}>
      {children}
    </LoginContext.Provider>
  )
}