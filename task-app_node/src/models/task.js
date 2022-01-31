const mongoose=require("mongoose");
const validator=require("validator");



const Task=mongoose.model("Task",{
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


module.exports=Task


// const task1=Task({
//     decription: "Task 1",
//     completed: true
// })

// task1.save().then(r=>{
//     console.log(r);
// }).catch(e=>{
//     console.log("eerre");
// })

