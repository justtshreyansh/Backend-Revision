const fs = require('fs');

//Synchronous reading of file 

fs.writeFileSync('./hello.txt','Hello there');



//Asynchronous reading of file

fs.writeFile('./test.txt',"Hello there this is asynchronous",(err)=>{
    if(err) console.log("Error occured");
    console.log("Done")
}
)

//read file sync

const result = fs.readFileSync('./test.txt','utf-8');
console.log(result);

//read file async

fs.readFile('./test.txt','utf-8',(err,data)=>{
    if(err) console.log("Error occured");
    console.log(data);
})

//appending a file 
fs.appendFile('./test.txt',"\nThis is new line",(err)=>{
    if(err) console.log("Error occured")
})


fs.unlink('./test.txt',(err)=>{
    if(err) console.log("Error occured")
})