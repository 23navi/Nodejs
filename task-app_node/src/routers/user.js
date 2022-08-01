const express =require("express");
const User= require("../models/user.js");

const router=express.Router();

//New User post route
router.post("/users",async(req,res)=>{
    const newUser= new User(req.body);
    try{
        await newUser.save()
        res.status(201).send(newUser)

    }catch(e){
        res.status(400).send()
    }
})


// find all the users

router.get("/users",async (req,res)=>{

    try{
        const users= await User.find({})
        res.status(200).send(users)
    }catch(e){
        res.status(400).send()
    }
    
})


// find individual user

router.get("/users/:id",async(req,res)=>{

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



//delete a user by id

router.delete("/users/:id",async(req,res)=>{
    try{
        const user= await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).send("No user found")
        }
        res.status(200).send(user)
    }catch(e){

    }
})








module.exports=router;
