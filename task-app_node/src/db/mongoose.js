const mongoose=require("mongoose");



// brew services start mongodb-community@5.0

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
    useNewUrlParser:true
})












