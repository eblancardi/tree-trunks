
  const mongoose = require('mongoose')
 
  const userTreeSchema = new mongoose.Schema({
    name: String,
    family: String, // enum: [], // to define afterwards 
    shape: String,
    origin: String,
    description: String,
    availability: Number, // enum: [], // to define afterwards
    environment: String,
    climate: String,
    author: String,
    bloom: Array,

    
    createdAt: {
      type: Date,
      default: new Date()
    }
  })
   
  const userTree = mongoose.model('Post', userTreeSchema)
   
  module.exports = userTree
