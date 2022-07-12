import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider"
import { GenerateRefreshToken } from "../../providers/GenerateRefreshToken"
import RefreshToken from '../../Schemas/RefreshTokenSchema'
import User from '../../Schemas/UserSchema'
import { compare } from 'bcryptjs'

interface IRequest {
  email: string
  password: string
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    // Verificar se usuario existe 
    const userAlreadyExists = await User.findOne({
      email
    })

    const useId = userAlreadyExists._id

    if(!userAlreadyExists) {
      throw new Error("User or password incorrect!")
    }

    // Verificar se a senha esta correta
    const passwordMatch = await compare(password, userAlreadyExists.password)

    if(!passwordMatch) {
      throw new Error("User or password incorrect!")
    }

    // gerar token do usuario 
    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(useId.toString())

    await RefreshToken.deleteMany({
      userId: userAlreadyExists.id
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    )

    return { token, refreshToken }
  }
}

export { AuthenticateUserUseCase}