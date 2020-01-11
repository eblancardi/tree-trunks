
const mongoose = require('mongoose')
 
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
  
    trees: {
      type: String, 

    },

    usertreeimg:{
      type: String,

    }, 
    }, {
      timestamps : { createdAt: "created_at", updatedAt: "updated_at" }
    }
);
  
module.exports = mongoose.model('User', UserSchema)