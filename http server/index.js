const http = require('http')
const fs = require('fs');
const myServer = http.createServer((req,res)=>{
    const log = `${Date.now()}: ${req.url} new request recieved\n`;
   fs.appendFile('log.txt',log,(err,data)=>{
    switch(req.url){
        case '/':res.end("Home page");
        break;

        case '/about':res.end("About page");
        break;

        default:res.end("Error 404");
    }
   })
   
});


myServer.listen(3000,()=>{
    console.log("Server is running");
})