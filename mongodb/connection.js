const mongoose =require('mongoose');

async function connectMongoDB(){
    return mongoose.connect('mongodb://localhost:27017/youtube-app-1').then(()=>console.log("MongoDB Connected")).catch((e)=>console.log("Error occured"));
}

module.exports = {connectMongoDB}