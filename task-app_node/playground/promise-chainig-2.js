require("../src/db/mongoose")
const Task=require("../src/models/task");

// Task.findByIdAndDelete("61f6697bf7d9ea0f4b4b38f0").then(r=>{
//     console.log(r);
//     return Task.countDocuments({ "completed": false })
// }).then(r=>{
//     console.log(r)
// }).catch(e=>{
//     console.log(e)
// })


const deleteandcount = async (id)=>{
    await Task.findByIdAndDelete(id)
    return await Task.countDocuments({ "completed": false })
}


deleteandcount("61f79f79262540d285eab495").then(r=>{
    console.log(r)
})








// const add = (a,b)=>{
//     return new Promise((res,rej)=>{
//         setTimeout(()=>{
//             res(a+b)
//         },2000)
//     })
// }


// const doWo= async()=>{
//     return await add(await add(4,3),await add(4,3));
// }


// doWo().then(r=>{
//     console.log(r)
// })