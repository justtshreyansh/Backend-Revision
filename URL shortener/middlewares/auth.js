const {getUser} = require('../services/auth');

async function restrictUserToLoggedIn(req,res,next){
    const userId = req.cookies?.uid;

    if(!userId) return res.redirect('/');

    const user = getUser(userId);

    if(!user) return res.redirect('/');

    req.user = user;
    next();
}

async function checkAuth(req,res,next){
    const userId = req.cookies?.uid;

    

    const user = getUser(userId);

    

    req.user = user;
    next();
}

module.exports = {restrictUserToLoggedIn,checkAuth}