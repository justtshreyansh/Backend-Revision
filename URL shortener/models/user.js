const mongoose  = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('users',UserSchema);