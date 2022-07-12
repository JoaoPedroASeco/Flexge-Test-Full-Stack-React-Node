import { authService } from "../services/auth/authService"
import { Spinner } from 'phosphor-react'
import { FormEvent, useState } from "react"

export const Login = () => {
  // States
  const [email, setEmail] = useState('joao@hotmail.com')
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
    const res = await authService.login({
      email,
      password
    })
    
    
    if(res.token && res.token.length > 0 ) {  // Redirecting to Student page
      setSuccess(true)
      
      setTimeout(() => window.location.href ='/students' , 1000)
    } else {  
      setError(true)
    }
  }

  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center bg-flexge-green-800 bg-bgLogin">
        <div className="relative flex flex-col items-center  bg-white w-[32.5rem] h-[32rem] p-10 rounded">
          {/* Logo */}
          <img 
            className="w-[18.75rem] mb-16"
            src="/img/flexge-logo-login.png" alt="flexge-logo" 
          />

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col w-full h-full text-zinc-500">
            
            <div className="flex flex-col mt-4">
              <label 
                className={`transition-all ${email.length > 0 ? 'text-flexge-green-600 transition-all' : ''} ${error ? 'text-flexge-red-300' : ''}`}
                htmlFor="email"
              >
                E-mail
              </label>

              <input
                className={`outline-none border-b border-zinc-300 transition-all ${email.length > 0 ? 'border-b-flexge-green-600 transition-all' : ''} ${error ? 'border-b-flexge-red-300' : ''}`}
                onChange={e => setEmail(e.target.value)}
                value={email}
                name='email'
                type="text"
              />

              {error && <span className="text-flexge-red-300 text-[0.75rem] pt-1">invalid email</span>}
            </div>

            <div className="flex flex-col mt-4">
              <label 
                className={`transition-all ${password.length > 0 ? 'text-flexge-green-600 transition-all' : ''} ${error ? 'text-flexge-red-300' : ''}`}
                htmlFor="password"
              >
                Senha
              </label>

              <input
                className={`outline-none border-b border-zinc-300 transition-all ${password.length > 0 ? 'border-b-flexge-green-600 transition-all' : ''} ${error ? 'border-b-flexge-red-300' : ''}`}
                onChange={e => setPassword(e.target.value)}
                value={password}
                name='password'
                type="password"
              />

              {error && <span className="text-flexge-red-300 text-[0.75rem] pt-1">invalid password</span>}
            </div>

            <div className="flex w-full justify-between items-center mt-auto mb-4">
              <a
                className="uppercase hover:text-blue-500" 
                href="#"
              >
                esqueci minha senha
              </a>

              <button 
                className="text-white uppercase bg-flexge-green-600 py-[6px] px-[16px] rounded hover:brightness-75 transition-all"
                type="submit"
              >
                entrar
              </button>
            </div>
          </form>

          {success && <div className="absolute bottom-[-15px] origin-top-left-1/3-3/4 flex justify-center items-center min-h-[2.563rem] min-w-[18.75rem] bg-flexge-green-600 rounded font-bold"><span>Loading...</span> <Spinner className="animate-spin ml-4" /></div>}
          {error && <div className="absolute bottom-[-15px] origin-top-left-1/3-3/4 flex justify-center items-center min-h-[2.563rem] min-w-[18.75rem] bg-flexge-red-300 rounded font-bold"><span>Something wrong</span></div>}
        </div>
      </div>
    </>
  )
}