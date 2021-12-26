const express =require("express");
const app=express()

app.get("/url/:var/:urr",(req,res)=>{
    res.send(req.params);
})

app.listen(3000,()=>{
    console.log("Server running on 3000");
})