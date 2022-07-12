import Student from '../../Schemas/StudentSchema'

interface IStudentRequest {
  id?: string
  name?: string 
  age?: number
  course?: string
  school?: string
}

class StudentUseCase {
  // Create of Students
  async createStudentMiddleware({ name, age, course, school }: IStudentRequest) {

    const studentAlreadyExists = await Student.findOne({ name })
    
    if (studentAlreadyExists) {
      throw new Error('Student already exists')
    }

    const student = await Student.create({
      name, 
      age, 
      course, 
      school
    })

    return student
  }

  // Edit Students
  async editStudentMiddleware({ id, name, age, course, school }: IStudentRequest) {
    const studentAlreadyExists = await Student.findOne({ id })

    if (!studentAlreadyExists) {
      throw new Error('Id is wrong or is missing')
    }

    const student = await Student.updateOne({
      name, 
      age, 
      course, 
      school
    })

    return student
  }

  // Delete Student
  async deleteStudentMiddleware({ id }: IStudentRequest) {
    const studentAlreadyExists = await Student.findOne({ _id: id })

    if (!studentAlreadyExists) {
      throw new Error('Id is wrong or is missing')
    }

    const student = await Student.deleteOne({ _id: id })

    return student
  }
}

export { StudentUseCase }