const express = require('express')
const path = require('path')
const {connectMongoDB}  = require('./connection')
const cookieParser= require('cookie-parser')
const port = 3000;

const router = require('./routes/user')
const authRouter = require('./routes/auth')
const {restrictToLoggedInUserOnly} = require('./middlewares/auth')

const app = express();

connectMongoDB();

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(router);
app.use('/auth',authRouter);

app.listen(port,()=>{
    console.log("Server is running");
})