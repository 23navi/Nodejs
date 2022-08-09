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


// update user detail by id

router.patch("/users/:id",async(req,res)=>{
  
    const updates=Object.keys(req.body)
    const allowedUpdates=["name","age","password","email"]; //so if someone does {id:4985r9yhf} it will not update as updating id is not a valid opeation 
    const isValidOperation= updates.every((update)=> {
        
        return allowedUpdates.includes(update)}
        )

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try{

        const user=await User.findById(req.params.id)
        if(!user){
            return res.status(400).send("User not found")
        }

        //const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        //findByIdAndUpdate() bypass mongoose middleware and we want mongoose to run .pre and hash password... so we will use more traditional way to update the user.
        
        //we get the user by the id provided by the user.
        
        updates.forEach(update=>{
            user[update]=req.body[update];
        })
        await user.save();

        res.status(200).send(user); 

    }catch(e){
        res.status(500).send(e)
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
