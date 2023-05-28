const {readFileSync,writeFileSync} = require("fs")
const express =require("express")

const app=express()




//This code will do the task but this will only tackle when someone goes to the main/index. Say you are stackover flow, who the fuck goes to 
//the index or landing page? We need to make it so that we record a count whenever someone comes to any page/subpage,
//Note: It will count everytime someone goes to any page, it will be more of website impression rather count

// app.get("",(req,res)=>{
//     let count=readFileSync("./count.txt")
//     count=parseInt(count)
//     const newCount=(count)+1
//     writeFileSync("./count.txt",newCount)
//     res.send({visitCount:newCount})
// })

//Note: It will count everytime someone goes to any page, it will be more of website impression rather count


//there is some problem, it is incrementing 2 and not one

app.listen(3000,()=>{
    console.log("http://localhost:3000")
})