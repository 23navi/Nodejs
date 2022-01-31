const express=require("express");
require("./db/mongoose");
const User=require("./models/user");
const Task=require("./models/task");

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


app.listen(PORT,()=>{
    console.log("App up and running on port ",PORT);
})


