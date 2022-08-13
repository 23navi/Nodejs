const express=require("express");
require("./db/mongoose");


const userRouter=require("./routers/user")
const tastRouter=require("./routers/task")

const PORT= process.env.PORT || 3000;




const app=express();

// app.use((req,res)=>{
//     res.status(503).send("Under maintainance")
// })

app.use(express.json());
app.use(userRouter);
app.use(tastRouter);

app.get("/",(req,res)=>{
    res.send("hello");
})


app.listen(PORT,()=>{
    console.log("App up and running on port ",PORT);
})







// JSON.stringify(a) and a.toJSON() difference 

// const a={
//     b:"hello",
//     c:334
// }

// a.toJSON = function(){
//     console.log("Hellooooooo");
//     return 1;
// }

// console.log(JSON.stringify(a));




// const User=require("./models/user");
const Task=require("./models/task");

// const someFun=async()=>{
//     const user=await User.findById("62f75027ba1cc744fc928ab4")
//     await user.populate("allTasks")
//     console.log(user.allTasks);

//     // const task=await Task.findById("62f751ea24e1e955121e49b1")
//     // await task.populate("owner");
//     // console.log(task);

// }
// someFun()




// const main= async()=>{
//     // const task=await Task.findOne({id:"62f7c66bdfeaa5eb594a936b"});
//     const task=await Task.findOne({_id:"62f7c673dfeaa5eb594a936f"});
//         console.log(task)
// }

// main()
