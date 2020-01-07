
  const mongoose = require('mongoose')
 
  const UserTreeSchema = new mongoose.Schema({
    name: String,
    creator: String,
    family: String, enum: [], // to define afterwards 
    shape: String,
    origin: String,
    description: String,
    availability: String, enum: [], // to define afterwards
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
  /*
- Creator (reference to user name)
- Type (enum, vers catalogue)
- Climate (type string)
- Bloom (type enum)
- Availability (country) (type enum)
- Description (type string)
FARIDA LA REPUTEE DES BETISES 
	*/