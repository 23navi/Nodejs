const mongoose=require("mongoose");

// brew services start mongodb-community@6.0

//mongosh to run mongoserver in terminal


mongoose.connect(process.env.MONGODB_SERVER,{useNewUrlParser: true})
.then(()=>{
    console.log("MongoDb connection open");
})
.catch(err=>{
    console.log("error");
})










