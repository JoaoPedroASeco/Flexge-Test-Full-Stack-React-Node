import { Request, Response } from "express"
import { UserUseCase } from "./UserUseCase"

class UserController {
  async create(request: Request, response: Response) {
    const { email, name, password } = request.body

    const createUserUseCase = new UserUseCase()

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