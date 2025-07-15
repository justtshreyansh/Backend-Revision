const express = require('express')

const app = express();

app.get('/',(req,res)=>{
    res.send(`Hello from ${req.query.name} Page`);
})

app.listen(3000,()=>{
    console.log("Server has started")
})