const launches= new Map();
let flightNumber=100;


const launch ={
    flightNumber:100,
    mission: "kepler Exp",
    rocket: "roketname",
    launchDate:new Date("Dec 23,2020"),
    destination:"keksaf",
    customer:["Zka","navi"],
    upcoming:true,
    success:true
}

launches.set(launch.flightNumber,launch)

const getAllLaunches =()=>{
    return Array.from(launches.values())
}

const addNewLaunch=(launch)=>{
    flightNumber++;
    launches.set(flightNumber,Object.assign(launch,{
        flightNumber,
        customer:["Zka","navi"],
        upcoming:true,
        success:true,
    }))

}

module.exports={
    getAllLaunches,
    addNewLaunch
}



