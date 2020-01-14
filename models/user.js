const mongoose = require('mongoose')
 
const Schema =  mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    googleID: { 
        type:String,

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
      required: true
    },

    usertreeimg:{
      type: String,
      required:true
    }
})
 
const User = mongoose.model("User", userSchema);

module.exports = User;