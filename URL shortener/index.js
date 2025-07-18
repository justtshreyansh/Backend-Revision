const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const urlRouter = require('./routes/url')
const staticRoute = require('./routes/staticRoutes')
const URL = require('./models/url')
const app = express();

mongoose.connect('mongodb://localhost:27017/shortURL').then(()=>console.log("MongoDB connected")).catch(e=>console.log("Error occured"));

app.set('view engine','ejs');
app.set('viwes',path.resolve('./views'));


app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use('/url',urlRouter);
app.use('/',staticRoute)
app.get('/url/:shortId',async(req,res)=>{
    const shortId =req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(entry.redirectURL);
})



app.listen(3000,()=>console.log("server is running"))