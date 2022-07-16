import { Request, Response } from "express"
import User from "../../Schemas/UserSchema"
import { UserUseCase } from "./UserUseCase"
const createUserUseCase = new UserUseCase()

class UserController {
  // Create user mockup
  async createUserMockup(request: Request, response: Response) {
    const userAlreadyExists = await User.find({ email: 'user@gmail.com' })

    if(userAlreadyExists.length > 0) return response.status(403).send('User mockup already created!')

    try {
      const user = await createUserUseCase.createUserMiddleware({
        name: 'User',
        email: 'user@gmail.com',
        password: '123',
      })
  
      return response.status(200).send('User mockup created!')
    } catch (error) {
      return error
    }
  }

  // Create user
  async create(request: Request, response: Response) {
    const { email, name, password } = request.body

    try {
      const user = await createUserUseCase.createUserMiddleware({
        name,
        email,
        password,
      })
  
      return response.status(200).send(user)
    } catch (error) {
      return error
    }
  }
}

export { UserController }