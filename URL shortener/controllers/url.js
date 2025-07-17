const shortId = require('shortid');
const URL =  require('../models/url');

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"url is required"});
    const shortID = shortId();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitedHistory:[]
    })
    return res.json({id:shortID})
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    res.json({clickCounter:result.visitHistory.length,visitHistory:result.visitHistory})
  
}
module.exports = {handleGenerateNewShortURL,handleGetAnalytics}