const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")



const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"Ahost"
    },
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value<0){
                throw new Error("oops add age greater than 0" )
            }
        }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }
    },
    
    password:{
        type:String,
        required: true,
        trim:true,
        validate(value){
            if(value.length<=6){
                throw new Error("Password should be greater than 6 character");
            }
            else if(((value.toLowerCase()).includes("password"))){
                throw new Error("Password should not include 'pasword in it'");
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
        
      
    }]

}
)


//creating instance method
userSchema.methods.genAuthToken=async function(){
    const user=this;
    const token= jwt.sign({id:user.id.toString()},"NaviSureka",{expiresIn:"1 day"})
    user.tokens.push({token});
    //user.tokens=user.tokens.concate({token})
    await user.save();
    
    return token;
}



//creating model method
userSchema.statics.findByCred= async function(email,rawPass){
    const user= await User.findOne({email})
    if(!user){ throw new Error("No user found")}

    const isMatch = await bcrypt.compare(rawPass,user.password);
    if(!isMatch){ throw new Error("Wrong password")}
    return user;
}







//This a document middleware of mongoose... one of 4 types of mongoose middleware

userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified("password")){
        user.password=await bcrypt.hash(user.password,8)
        console.log(user.password);
    }
    next();
})

//goal is to not show user the hashed password and the whole array of tokens
//Method one which we are not using 

// usesrSchema.methods.getUserDetails= function (){
    
// }


// method two to acheive the same goal
usesrSchema.methods.toJSON= function (){
    const user=this;
    const userObj=user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    return userObj;
}



const User=mongoose.model("User",userSchema);

module.exports=User;





// const user1=new User({
//     age: 1,
//     name:"Sureka Navi",
//     email:"navisureka23@gmail.com",
//     password:"NaPas123"

// })

// user1.save().then((user)=>{
//     console.log(user);
// }).catch((e)=>{
//     console.log(e);
// })

