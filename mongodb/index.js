const express = require('express')
const mongoose = require('mongoose');

const port = 3000;

const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/youtube-app-1').then(()=>console.log("MongoDB Connected")).catch((e)=>console.log("Error occured"));


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

app.get('/users',async (req,res)=>{
    const result = await User.find();
    return res.status(200).json(result)
})
app.post('/users',async (req,res)=>{
    const body = req.body;
    const result =  await User.create({
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        jobTitle:body.jobTitle
    })

    return res.status(201).json({message:"Success"});
})

app.get('/users/:id',async(req,res)=>{
    const user = await User.findById(req.params.id);
    return res.status(201).json({message:"Success",data:user});

})

app.patch('/users/:id',async(req,res)=>{
    const user= await User.findByIdAndUpdate(req.params.id,{firstName:req.body.firstName});
    return res.status(201).json({message:"Success",data:user});
})
app.listen(port,()=>{
    console.log("Server is running");
})