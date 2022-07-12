// Import Mongoose
import mongoose from 'mongoose'

// Database Config
mongoose.connect('mongodb://127.0.0.1:27017/flexge')
mongoose.Promise = global.Promise

export default mongoose