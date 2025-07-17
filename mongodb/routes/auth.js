const express = require('express');

const router = express.Router();
const {handleCreateUser,handleLoginUser}  = require('../controllers/auth');
router.post('/',handleCreateUser);
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login',handleLoginUser);

module.exports = router;