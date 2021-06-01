const {readFileSync,writeFileSync} = require("fs")
const express =require("express")

const app=express()

app.get("",(req,res)=>{
    let count=readFileSync("./count.txt")
    count=parseInt(count)
    const newCount=(count)+1
    writeFileSync("./count.txt",newCount)
    res.send({visitCount:newCount})
})



app.listen(3000,()=>{
    console.log("http://localhost:3000")
})