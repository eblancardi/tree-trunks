const mongoose = require('mongoose')
 
const Schema =  mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    },

    googleID: { 
        type:String
    },

    firstname: {
      type: String,
      required: true,
      },

    lastname:{
      type: String,
      required: true,
      },

    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
        type: String,
    
    },

    avatar: String,
  
    trees: [ { type : Schema.Types.ObjectId, ref: 'userTree' } ],
  }, {
    timestamps : { createdAt: "created_at", updatedAt: "updated_at" }
  }
);
 
const User = mongoose.model("User", userSchema);

module.exports = User;