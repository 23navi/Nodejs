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
app.post("/users",(req,res)=>{
    console.log(req.body)
    const newUser= new User(req.body);

    newUser.save().then((user)=>{
        res.send(user);
    }).catch((e)=>{
        res.send(e);
    })
    
})


// find all the users

app.get("/users",(req,res)=>{
    User.find({}).then(resolve=>{
        res.status(200).send(resolve);
    }).catch(e=>{
        res.status(400).send(e);
    })
})


// find individual user

app.get("/users/:id",(req,res)=>{
    
    User.findById(req.params.id).then(resolve=>{
        if(!resolve){
            return res.status(400).send("No user found with this id");
        }
        res.status(201).send(resolve);
    }).catch(e=>{
        res.status(500).send(e);
    })
})


//New Task post route

app.post("/tasks",(req,res)=>{
    const newTask= new Task(req.body);
    newTask.save().then(()=>{
        res.status(201);
        res.send(newTask);
    }).catch(e=>{
        res.status(400);
        res.send(e);
    })
})


//get all the tasks

app.get("/tasks",(req,res)=>{
    Task.find({}).then(resolve=>{
        res.status(200).send(resolve);
    }).catch(e=>{
        res.status(400).send(e);
    })
})

// get individual task by id

app.get("/tasks/:id",(req,res)=>{
    Task.findById(req.params.id).then(resolve=>{
        if(!resolve){
            res.status(400).send("No task with this id");

        }else{
            res.status(200).send(resolve);
        }
    }).catch(e=>{
        res.status(500).send(e);
    })
})


app.listen(PORT,()=>{
    console.log("App up and running on port ",PORT);
})


