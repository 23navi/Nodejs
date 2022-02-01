const express=require("express");
require("./db/mongoose");
const User=require("./models/user");
const Task=require("./models/task");
const { resolve } = require("mongodb/lib/core/topologies/read_preference");

const PORT= process.env.PORT || 3000;

const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello");
})



//New User post route
app.post("/users",async(req,res)=>{
    const newUser= new User(req.body);
    try{
        await newUser.save()
        res.status(201).send(newUser)

    }catch(e){
        res.status(400).send()
    }
})


// find all the users

app.get("/users",async (req,res)=>{

    try{
        const users= await User.find({})
        res.status(200).send(users)
    }catch(e){
        res.status(400).send()
    }
    
})


// find individual user

app.get("/users/:id",async(req,res)=>{

    try{
        const users= await User.findById(req.params.id);
        if(!users){
            return res.status(400).send("No user found with this id");
        }
        res.status(201).send(users);

    }catch(e){
        res.status(400).send()
    }
    
})


//New Task post route

app.post("/tasks",async(req,res)=>{

    const newTask= new Task(req.body);

    try{
        await newTask.save()
        res.status(201).send(newTask);
    }catch(e){
        res.status(400).send(e)
    }

})


//get all the tasks

app.get("/tasks",async(req,res)=>{

    try{
        const tasks= await Task.find({})
        res.status(200).send(tasks);
    }catch(e){
        res.status(400).send(e);
    }
    
})

// get individual task by id

app.get("/tasks/:id",async(req,res)=>{
    try{
        const tasks=await Task.findById(req.params.id)
        if(!tasks){
            res.status(400).send("No task with this id");

        }else{
            res.status(200).send(tasks);
        }
    }catch(e){
        res.status(500).send(e);
    }
})


app.listen(PORT,()=>{
    console.log("App up and running on port ",PORT);
})


