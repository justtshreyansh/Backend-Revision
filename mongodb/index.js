const express = require('express')

const {connectMongoDB}  = require('./connection')

const port = 3000;

const router = require('./routes/user')

const app = express();

connectMongoDB();

app.use(express.json());

app.use(router);

app.listen(port,()=>{
    console.log("Server is running");
})