const User= require("../routers/user")
const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    console.log("hello");
    next()
}


module.exports=auth