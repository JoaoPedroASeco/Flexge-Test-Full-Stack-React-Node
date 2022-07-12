import mongoose from '../../db'

const UserSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  refresh_token: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:'RefreshToken',
    required: false
  },
})

const User = mongoose.model('User', UserSchema)

export default User