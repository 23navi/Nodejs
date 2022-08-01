const express=require("express");
require("./db/mongoose");
const User=require("./models/user");
const Task=require("./models/task");

const userRouter=require("./routers/user")
const { resolve } = require("mongodb/lib/core/topologies/read_preference");

const PORT= process.env.PORT || 3000;

const app=express();
app.use(express.json());
app.use(userRouter);

app.get("/",(req,res)=>{
    res.send("hello");
})






//delete a user by id

app.delete("/users/:id",async(req,res)=>{
    try{
        const user= await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).send("No user found")
        }
        res.status(200).send(user)
    }catch(e){

    }
})


//delete a task by id


app.delete("/tasks/:id",async(req,res)=>{
    try{
        const task= await Task.findByIdAndDelete(req.params.id)
        if (!task){
            return res.status(400).send("Task not found")
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})



app.listen(PORT,()=>{
    console.log("App up and running on port ",PORT);
})


