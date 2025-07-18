const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        required:true,
        type:String,
        
    },
    redirectURL:{
        type:String,
        required:true,
        unique:true
    },
    visitHistory:[{timestamp:{type:Number}}]
},{timestamps:true})

const URL = mongoose.model('url',urlSchema);

module.exports = URL;