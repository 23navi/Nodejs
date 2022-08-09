const mongoose=require("mongoose");

// brew services start mongodb-community@6.0

//mongosh to run mongoserver in terminal

const dbName="task-manager-api";


mongoose.connect("mongodb://127.0.0.1:27017/"+dbName,{useNewUrlParser: true})
.then(()=>{
    console.log("MongoDb connection open");
})
.catch(err=>{
    console.log("error");
})










