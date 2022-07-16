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
    const { _id, name, age, course, school } = request.body

    try {
      const student = await createStudentUseCase.editStudentMiddleware({
        _id,
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
    const { _id } = request.body
    
    try {
      const student = await createStudentUseCase.deleteStudentMiddleware({ _id })

      return response.status(200).send(student)
    } catch (error) {
      return error
    }
  }

  // List students
  async list(request: Request, response: Response) {
    const { limit = 12, page = 1, sort = 1 } = request.body

    try {
      const allStudents = await Student.find()
      
      const student = await Student.aggregate([
        {
          $sort: { _id: sort }
        },
        {
          $skip: page <= 1 ? 0 : limit * ( page - 1 ) 
        },
        {
          $limit: limit
        }
      ])

      return response.status(200).send({ 
        total: student.length,
        page: page,
        totalPages: Math.ceil(allStudents.length/limit) || 1,
        students: student,
        order: sort
      })
    } catch (error) {
      return error
    }
  }
}

export { StudentController }