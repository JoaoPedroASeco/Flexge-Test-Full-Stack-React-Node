import { useContext } from "react"
import { LoginContext } from "../../contexts/LoginContext"

export const LoginForm = () => {
  // Using Contexts
  const { email, setEmail, password, setPassword, error, handleLogin } = useContext(LoginContext)

  return (
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
  )
}