import mongoose from '../../db'

const RefreshTokenSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  expiresIn: { 
    type: String, 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  userId: { 
    type: String, 
  },
})

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema)

export default RefreshToken