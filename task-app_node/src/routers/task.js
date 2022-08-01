const express =require("express");
const User= require("../models/task.js");

const router=express.Router();






//New Task post route

router.post("/tasks",async(req,res)=>{

    const newTask= new Task(req.body);

    try{
        await newTask.save()
        res.status(201).send(newTask);
    }catch(e){
        res.status(400).send(e)
    }

})


//get all the tasks

router.get("/tasks",async(req,res)=>{

    try{
        const tasks= await Task.find({})
        res.status(200).send(tasks);
    }catch(e){
        res.status(400).send(e);
    }
    
})

// get individual task by id

router.get("/tasks/:id",async(req,res)=>{
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


// update user detail by id

router.patch("/users/:id",async(req,res)=>{
    try{
        
        const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    
        if(!user){
            return res.status(400).send("User not found")
        }
        res.status(200).send(user)

    }catch(e){
        res.status(500).send(e)
    }
})



// update task detail by id

router.patch("/tasks/:id",async(req,res)=>{
    try{
        const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new : true, runValidators:true})
        if(!task){
            return res.status(400).send("Task not found")
        }
        res.status(200).send(task)

    }catch(e){
        res.status(500).send(e)
    }
})




//delete a task by id

router.delete("/tasks/:id",async(req,res)=>{
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




module.exports= router;

