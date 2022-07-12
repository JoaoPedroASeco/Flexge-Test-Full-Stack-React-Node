import { Request, Response } from "express"
import Student from "../../Schemas/StudentSchema"
import { StudentUseCase } from "./StudentUseCase"
// Instancing
const createStudentUseCase = new StudentUseCase()

class StudentController {
  // Create student
  async create(request: Request, response: Response) {
    const { name, age, course, school } = request.body

    try {
      const student = await createStudentUseCase.createStudentMiddleware({
        name,
        age,
        course,
        school
      })

      return response.status(200).send(student)
    } catch (error) {
      return error
    }
  }

  // Edit students
  async edit(request: Request, response: Response) {
    const { name, age, course, school } = request.body

    try {
      const student = await createStudentUseCase.editStudentMiddleware({
        name,
        age,
        course,
        school
      })

      return response.status(200).send(student)
    } catch (error) {
      return error
    }
  }

  // Delete students
  async delete(request: Request, response: Response) {
    const { id } = request.body
    
    try {
      const student = await createStudentUseCase.deleteStudentMiddleware({ id })

      return response.status(200).send(student)
    } catch (error) {
      return error
    }
  }

  // List students
  async list(request: Request, response: Response) {
    // const { } = request.body

    try {
      const student = await Student.find()

      return response.status(200).send(student)
    } catch (error) {
      return error
    }
  }
}

export { StudentController }