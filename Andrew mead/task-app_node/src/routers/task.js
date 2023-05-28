const express =require("express");
const Task= require("../models/task.js");
const auth=require("../middleware/auth");
const User = require("../models/user.js");

const router=express.Router();






//New Task post route

router.post("/tasks",auth,async(req,res)=>{
    try{
        const newTask= await new Task({
            ...req.body,
            owner:req.user.id
        });

        await newTask.save()
        res.status(201).send(newTask);
    }catch(e){
        res.status(400).send(e)
    }

})


//get all the tasks

router.get("/tasks",auth,async(req,res)=>{

    try{
        const match={};
        let limit=10;
        let skip=0;

        if(req.query.completed){
            match.completed= req.query.completed === "true";
        }
        if(req.query.limit){
            limit= parseInt(req.query.limit);
        }
        if(req.query.skip){
            skip=parseInt(req.query.skip)
        }
    

        // const tasks= await Task.find({owner:req.user.id})  this can be one way to search all tasks

        const user= await User.findById(req.user._id).populate({
            path:"allTasks",
            match,
            options:{
                limit,
                skip
            }
        })

        res.status(200).send(user.allTasks);
    }catch(e){
        res.status(400).send(e);
    }
    
})

// get individual task by id

router.get("/tasks/:id",auth,async(req,res)=>{
    try{
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id});
        console.log((task._id));
        if(!task){
            res.status(400).send("No task with this id");

        }else{
            res.status(200).send(task);
        }
    }catch(e){
        res.status(500).send(e);
    }
})




// update task detail by id

router.patch("/tasks/:id",auth,async(req,res)=>{

    const updates=Object.keys(req.body)
    const allowedUpdates=["decription","completed"];
    const isValidOperation= updates.every((update)=> { 
        return allowedUpdates.includes(update)}
        )

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }

   
    try{
        const task= await Task.findOne({_id:req.params.id,owner:req.user._id});
        if(!task){
            return res.status(400).send("Task not found")
        }
        updates.forEach(update=>{
            task[update]=req.body[update];
        })
        await task.save();
        //const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new : true, runValidators:true})
        
        res.status(200).send(task)

    }catch(e){
        res.status(500).send(e)
        console.log("error");
    }
})




//delete a task by id

router.delete("/tasks/:id",auth,async(req,res)=>{
    try{
        const task= await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});
        if (!task){
            return res.status(400).send("Task not found")
        }
        res.status(200).send({"Deleted task: ": task})
    }catch(e){
        res.status(500).send(e)
    }
})




module.exports= router;

