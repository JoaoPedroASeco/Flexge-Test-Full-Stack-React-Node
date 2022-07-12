import mongoose from '../../db'

const StudentSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  name: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true 
  },
  course: { 
    type: String, 
  },
  school: { 
    type: String, 
  },
})

const Student = mongoose.model('Students', StudentSchema)

export default Student