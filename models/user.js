
const mongoose = require('mongoose');
 
const Schema =  mongoose.Schema;
const userSchema = new Schema({
    username: String,
    googleID: String,
    email:  String,
    //unique: true
    password:String,
    trees: Array,   
    
})
 
const User = mongoose.model("User", userSchema);

module.exports = User;