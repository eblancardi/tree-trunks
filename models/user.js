const mongoose = require('mongoose')
 
const Schema =  mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
      
    },

    googleID: { 
        type:String,

    },

    email: {
        type: String,

    },
    password: {
        type: String,
    
    },
    
    trees: {
      type: String, 
      
    },


})
 
const User = mongoose.model("User", userSchema);

module.exports = User;