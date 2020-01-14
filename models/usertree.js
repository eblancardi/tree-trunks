
  const mongoose = require('mongoose')

  const userTreeSchema = new mongoose.Schema({
    image: String,
    name: String,
    family: String, // enum: [], // to define afterwards 
    shape: String,
    origin: String,
    description: String,
    environment: String,
    climate: String,
    author: String,
    bloom: String,
    country: String, // enum: [], // to define afterwards 
    createdAt: {
      type: Date,
      default: new Date()
    }
  })
   
  const userTree = mongoose.model('Post', userTreeSchema)
   
  module.exports = userTree
