const mongoose = require('mongoose')
 
const Schema =  mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    },

    googleID: { 
        type:String,
        unique: true

    },

    firstname: {
      type: String,
      required: true,
      unique: true
      },

    lastname:{
      type: String,
      required: true,
      unique: true
      },

    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
        type: String,
    
    },
  
    trees: [ { type : Schema.Types.ObjectId, ref: 'userTree' } ],
  }, {
    timestamps : { createdAt: "created_at", updatedAt: "updated_at" }
  }
);
 
const User = mongoose.model("User", userSchema);

module.exports = User;