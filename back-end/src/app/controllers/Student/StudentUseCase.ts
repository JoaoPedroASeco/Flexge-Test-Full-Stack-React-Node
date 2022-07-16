import Student from '../../Schemas/StudentSchema'

interface IStudentRequest {
  _id?: string
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
  async editStudentMiddleware({ _id, name, age, course, school }: IStudentRequest) {
    const studentAlreadyExists = await Student.findOne({ _id })

    if (!studentAlreadyExists) {
      throw new Error('Id is wrong or is missing')
    }

    const student = await Student.updateOne(
      {
        _id
      },
      {
        $set: {
          name, 
          age, 
          course, 
          school
        }
      }
    )

    return student
  }

  // Delete Student
  async deleteStudentMiddleware({ _id }: IStudentRequest) {
    const studentAlreadyExists = await Student.findOne({ _id: _id })

    if (!studentAlreadyExists) {
      throw new Error('Id is wrong or is missing')
    }

    const student = await Student.deleteOne({ _id: _id })

    return student
  }
}

export { StudentUseCase }