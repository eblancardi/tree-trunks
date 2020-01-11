
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

    },

    usertreeimg:{
      type: String,

    }, 
    }, {
      timestamps : { createdAt: "created_at", updatedAt: "updated_at" }
    }
<<<<<<< HEAD
);
  
module.exports = mongoose.model('User', UserSchema)
=======
})
 
const User = mongoose.model("User", userSchema);

module.exports = User;
>>>>>>> 8afca8c9e6d07350b2595cd43cf3179b3def0550
