const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs")


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
    }

}
)

//This a document middleware of mongoose... one of 4 types of mongoose middleware

userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified("password")){
        user.password=await bcrypt.hash(user.password,8)
        console.log(user.password);
    }
    next();
})


const User=mongoose.model("User",userSchema);





module.exports=User;





// const user1=new User({
//     age: 1,
//     name:"Sureka Navi",
//     email:"navisureka23@gmail.com",
//     password:"NaPassword"

// })

// user1.save().then((user)=>{
//     console.log(user);
// }).catch((e)=>{
//     console.log(e);
// })

