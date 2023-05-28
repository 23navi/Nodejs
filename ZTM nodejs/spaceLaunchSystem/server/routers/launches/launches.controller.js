const {getAllLaunches, addNewLaunch}= require("../../models/launches.model");

const httpGetAllLaunches=(req,res)=>{
    return res.status(200).json(getAllLaunches())
}

const httpAddNewLaunch=(req,res)=>{
    let launch= req.body
    launch.launchDate= new Date(launch.launchDate)
    addNewLaunch(launch);
    res.send(launch);
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch
}