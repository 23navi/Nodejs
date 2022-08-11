const express=require("express");
require("./db/mongoose");
const User=require("./models/user");
const Task=require("./models/task");

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