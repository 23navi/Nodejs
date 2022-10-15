const {app,server}= require("./app");
const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

