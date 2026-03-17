//Lecture 1 : Introduction to Express.js  (13/06/2026)
// push code on the Postman  /serach?name=Ayush

const express = require ('express');
const app = express();

app.get('/',(req,res)=>{
    res.json({
        message : "Hello World"
   
    })
})

app.get("/user/:id",(req,res)=>{
    const id = req.params.id;
    res.json({
        userId:`The id of user is ${id}`
    });
})

app.get("/search",(req,res)=>{
    const name = req.query.name;
    res.json({
        name : `my name is ${name}`,
    });
});


app.listen(3000);

