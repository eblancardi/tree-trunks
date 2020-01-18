
  const mongoose = require('mongoose')
  const Schema =  mongoose.Schema;
  const userTreeSchema = new mongoose.Schema({
    image: String,
    name: String,
    family: String, 
    shape: String,
    origin: String,
    description: String,
    environment: String,
    climate: String,
    creatorID: { type : Schema.Types.ObjectId, ref: 'User' },
    bloom: String,
    country: String,
    createdAt: {
      type: Date,
      default: new Date()
    }
  })
   
  const userTree = mongoose.model('Post', userTreeSchema);
   
  module.exports = userTree;