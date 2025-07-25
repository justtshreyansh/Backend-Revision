const {getUser} = require('../services/auth')
async function restrictToLoggedInUserOnly(req,res,next){
    const userUid = req.cookies?.uid;
    if(!userUid){
        return res.redirect('/login')
    }
    const user = getUser(userUid);
    req.user= user;
    next();


}

module.exports = {restrictToLoggedInUserOnly}