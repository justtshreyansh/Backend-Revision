const express = require('express');
const fs = require('fs');
const users = require("./MOCK_DATA.json")
const app=  express();

const port = 3000;
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    console.log("Middle ware 1");
    next()
    
})

app.use((req,res,next)=>{
    console.log("Middle ware 2");
     return res.json({status:"middleware 2"});
    
})
//Routes
app.get('/api/users',(req,res)=>{
    res.json(users);
})

app.get('/users',(req,res)=>{
    const html = `
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join(' ')}
    </ul>
    `;

    res.send(html);
})


app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const filteredArray = users.find((ele)=>id===ele.id);
    return res.json(filteredArray)
})

app.post('/api/users',(req,res)=>{
    const body = req.body;
    console.log(body);
    users.push({...body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
         return res.json({status:"success"})
    })
   
})

app.patch('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const body  = req.body;
    let ele = users.findIndex((val)=>val.id===id);
    users[ele] = {
        ...users[ele],
        ...body
    }
    console.log(users[ele]);
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
         return res.json({status:"Patched successfully"})
    })
    
    
})

app.delete('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);

    const body = req.body;

    let arr = users.filter((val)=>val.id!==id);
    
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(arr),(err)=>{
         return res.json({status:"Deleted successfully"})
    })
    

})
app.listen(port,()=>{
    console.log('Server has started');

})