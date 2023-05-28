const {readFileSync,writeFileSync} = require("fs")

const newCount=()=>{
    let count=readFileSync("./src/c.txt")
    count=parseInt(count)
    let newC=(count)+1
    writeFileSync("./src/c.txt",newC.toString())
    return count;
}




module.exports=newCount;