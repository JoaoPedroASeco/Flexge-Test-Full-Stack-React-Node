// Import Mongoose
import mongoose from 'mongoose'

// Database Config
mongoose.connect('mongodb://localhost/flexge')
mongoose.Promise = global.Promise

module.exports = mongoose 