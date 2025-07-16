const express = require('express');

const router = express.Router();

const User = require('../models/users');

const {getUser, postUser, getUserById, patchUser} = require('../controllers/user')

router.get('/users',getUser);

router.post('/users',postUser);

router.get('/users/:id',getUserById);

router.patch('/users/:id',patchUser)

module.exports = router;