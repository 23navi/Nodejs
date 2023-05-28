const express= require('express')
const {httpGetAllLaunches,httpAddNewLaunch}= require("./launches.controller");
const router = express.Router()

router.get("/launches",httpGetAllLaunches);
router.post("/launches",httpAddNewLaunch)

module.exports=router;
