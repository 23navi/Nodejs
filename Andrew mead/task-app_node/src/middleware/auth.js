
const jwt=require("jsonwebtoken")
const User=require("../models/user")

const auth=async (req,res,next)=>{
    try{
        const token=(req.header("Authorization").replace("Bearer ",""));
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        const user=await  User.findOne({"id":decoded.id,"tokens.token":token});   // "tokens.token" is special syntex for geting match from arr of obj in mongoose only
        if(!user) {
            console.log("Invalid token");
            throw new Error()
        }
        req.token=token; 
        req.user=user // to save resources 
        next()
    }catch(e){
        res.status(401).send(e);
    }
    
}


module.exports=auth