
  const mongoose = require('mongoose')
 
  const UserTreeSchema = new mongoose.Schema({
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
   
  const UserTree = mongoose.model('Post', UserTreeSchema)
   
  module.exports = UserTree
