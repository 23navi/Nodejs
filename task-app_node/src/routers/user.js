const express =require("express");
const User= require("../models/user.js");
const jwt=require("jsonwebtoken");
const auth=require("../middleware/auth")
const multer= require("multer");

const router=express.Router();


const userAvatar = multer({
    limits:{
        fileSize:1000000,
    },
    fileFilter(req,file,callB){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            callB(new Error("Only JPEG, JPG or PNG form"));
        }
        callB(undefined,true);
    }
})



//New User post route (signup)
router.post("/users",async(req,res)=>{
    
    try{
        const newUser= await new User(req.body);
        const token= await newUser.genAuthToken();
        res.status(201).send({newUser,token})     //

    }catch(e){
        res.status(400).send()
    }
})

//login
router.post("/users/login",async(req,res)=>{

    try{
        const user= await User.findByCred(req.body.email,req.body.password);
        const token= await user.genAuthToken();
    
        if(!user){
            res.send("Sorry no user found");
        
        }else{
            res.send({user,token});
        }
    }catch(e){
        res.send(e);
    }
    
})

// Give user data to the logged in user.

router.get("/users/me",auth,async(req,res)=>{

    try{
        //const users= await User.find({}) //The user data is attached to req in auth middleware
        res.status(200).send(req.user)
    }catch(e){
        res.status(400).send()
    }
    
})


// find individual user


//We don't want even an auth user to access all other users with id

// router.get("/users/:id",auth,async(req,res)=>{

//     try{
//         const users= await User.findById(req.params.id);
//         if(!users){
//             return res.status(400).send("No user found with this id");
//         }
//         res.status(201).send(users);

//     }catch(e){
//         res.status(400).send()
//     }
    
// })


//logging out from one device

router.post("/users/logout",auth,async(req,res,next)=>{
    try{
        const user= req.user;
        const newTok=user.tokens.filter(token=>{
            return token.token!==req.token;
        })
        user.tokens=newTok;
        await user.save();
        res.send("logged out");

    }catch(e){
        res.status(500).send("Something went wrong");
    }
})



// logging out of all devices

router.post("/users/logoutAll",auth,async(req,res,next)=>{
    try{
        const user= req.user;
        
        user.tokens=[];
        await user.save();
        res.send("logged out from all devices");

    }catch(e){
        res.status(500).send("Something went wrong");
    }
})


// update user detail by id

router.patch("/users/me",auth,async(req,res)=>{
  
    const updates=Object.keys(req.body)
    const allowedUpdates=["name","age","password","email"]; //so if someone does {id:4985r9yhf} it will not update as updating id is not a valid opeation 
    const isValidOperation= updates.every((update)=> {
        
        return allowedUpdates.includes(update)}
        )

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try{

        const user=req.user;
        //we don't have to check if user is available bec it was done by auth and we have user data on req.user
        // const user=await User.findById(req.params.id)
        // if(!user){
        //     return res.status(400).send("User not found")
        // }

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

router.delete("/users/me",auth,async(req,res)=>{
    try{

        //await req.user.remove();   // note that the .remove is depricated 

        // mongoose cascade on delete will be according to colt's video...


        console.log("reached here")
        const user= await User.findOneAndDelete({_id:req.user._id})
        // we can also do deleteOne? what will be the middleware called??
        
        console.log("deleting usersss")
        if(!user){
            return res.status(400).send("No user found")
        }
        res.status(200).send({"Deleted User":req.user})
    }catch(e){
        res.status(500).send("no user");
    }
})




// upload user avatar (dp) and we can also use this route to change the dp
router.post("/users/me/avatar",auth, userAvatar.single("avatar"),async(req,res)=>{
    req.user.avatar=req.file.buffer;
    await req.user.save();
    res.send("okk");
})

//delete usesr avatar(dp)
router.delete("/users/me/avatar",auth,async(req,res)=>{
    req.user.avatar=undefined, 
    await req.user.save()
    res.send("okkk");
})






module.exports=router;
