const Auth = require('../models/auth');
const User = require('../models/users');
const {setUser,getUser} = require('../services/auth')
const  {v4:uuidv4} = require('uuid')
const handleCreateUser = async(req,res)=>{
    const {name,email,password} = req.body;
    await Auth.create({
        name,email,password
    })

   return res.render("login");
}

const handleLoginUser = async(req,res)=>{
    const {email,password} = req.body;
    const user = await Auth.findOne({email,password});
    if(!user){
       return  res.render('login');
    }

    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie('uid',sessionId)
    return res.redirect('/');

   
}

module.exports = {handleCreateUser,handleLoginUser};