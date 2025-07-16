const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        required:true,
        type:String,
        

    },
    lastName:{
        required:true,
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    jobTitle:{
        type:String,
        required:false,
        
    }

},{timestamps:true});

const User = mongoose.model('users',userSchema);

module.exports= User;