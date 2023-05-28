const {app,server}= require("./app");
const {loadPlanetsData}= require("./models/planets.model");
const PORT= process.env.PORT || 3001;

async function startServer(){
    await loadPlanetsData();
    server.listen(PORT,()=>{
        console.log("Listening to port ",PORT);
    })
}

startServer();

