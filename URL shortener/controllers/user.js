const User = require('../models/user');
const {v4:uuidv4} = require('uuid');
const {setUser} = require('../services/auth')
async function handleSignUp(req,res){
    const {name,email,password} = req.body;
    await User.create({
        name,email,password
    })
    return res.redirect('/')
}

async function handleLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    console.log("User",user)
    if(!user){
        return res.render('login',{error:"invalid credentials"})
    }
    // const sessionId = uuidv4();
    const token = setUser(user);
    // setUser(sessionId,user);
    res.cookie('uid',token);
   
    return res.redirect('/');
}

module.exports = {handleSignUp,handleLogin};