import { hash } from 'bcryptjs'
import User from '../../Schemas/UserSchema'

interface IUserRequest {
  name: string
  email: string
  password: string
}

class UserUseCase {
  async createUserMiddleware({ name, email, password }: IUserRequest) {
    // Verifica se usuario existe
    const userAlredyExists = await User.findOne({
      where: {
        email
      }
    })

    if (userAlredyExists) {
      throw new Error('User already exists')
    }

    // Cadastra o usuario
    const passwordHash = await hash(password, 8)

    const user = await User.create({
      name,
      email,
      password: passwordHash,
    })

    return user
  }
}

export { UserUseCase }