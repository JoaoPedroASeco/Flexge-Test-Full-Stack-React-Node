// Icons Import
import { Spinner } from 'phosphor-react'
import { LoginContext } from "../contexts/LoginContext"
import { LoginForm } from "../components/Login/LoginForm"
// React import
import { useContext } from 'react'
import { LoginLogo } from '../components/Login/LoginLogo'

export const Login = () => {
  // States of Contexts
  const { error, success } = useContext(LoginContext)

  return (
    <>
      {/* Container */}
      <div className="flex w-screen h-screen justify-center items-center bg-flexge-green-800 bg-bgLogin">
        {/* Login container */}
        <div className="relative flex flex-col items-center  bg-white w-[32.5rem] h-[32rem] p-10 rounded">

          {/* Logo */}
          <LoginLogo />

          {/* Form */}
          <LoginForm />

          {/* Messages status */}
          {success && <div className="absolute bottom-[-15px] origin-top-left-1/3-3/4 flex justify-center items-center min-h-[2.563rem] min-w-[18.75rem] bg-flexge-green-600 rounded font-bold"><span>Loading...</span> <Spinner className="animate-spin ml-4" /></div>}
          {error && <div className="absolute bottom-[-15px] origin-top-left-1/3-3/4 flex justify-center items-center min-h-[2.563rem] min-w-[18.75rem] bg-flexge-red-300 rounded font-bold"><span>Something wrong</span></div>}
        </div>
      </div>
    </>
  )
}