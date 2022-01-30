const mongoose=require("mongoose");
const validator=require("validator");


// brew services start mongodb-community@5.0

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
    useNewUrlParser:true
})

const Users=mongoose.model("Users",{
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

})



// const user1=new Users({
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




const Task=mongoose.model("Tasks",{
    decription:{
        type:String,
        required:true,
        trim:true
    },

    completed:{
        type: Boolean,
        default:false
    }
})


const task1=Task({
    decription: "Task 1",
    completed: true
})

task1.save().then(r=>{
    console.log(r);
}).catch(e=>{
    console.log("eerre");
})








