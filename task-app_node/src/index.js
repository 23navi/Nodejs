const express=require("express");
require("./db/mongoose");
const User=require("./models/user");
const Task=require("./models/task");

const PORT= process.env.PORT || 3000;

const app=express();
app.use(express.json);

app.get("/",(req,res)=>{
    res.send("hello");
})

app.post("/users",(req,res)=>{
    res.send("user to be created");
})

app.listen(PORT,()=>{
    console.log("App up and running on port ",PORT);
})


