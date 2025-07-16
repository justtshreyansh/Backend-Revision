const User = require('../models/users');
const  express =require('express');


const getUser = async (req,res)=>{
    const result = await User.find();
    return res.status(200).json(result)
}
const postUser = async (req,res)=>{
    const body = req.body;
    const result =  await User.create({
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        jobTitle:body.jobTitle
    })

    return res.status(201).json({message:"Success"});
}

const getUserById = async(req,res)=>{
    const user = await User.findById(req.params.id);
    return res.status(201).json({message:"Success",data:user});

}

const  patchUser = async(req,res)=>{
    const user= await User.findByIdAndUpdate(req.params.id,{firstName:req.body.firstName});
    return res.status(201).json({message:"Success",data:user});
}

module.exports = {getUser,postUser,getUserById,patchUser}