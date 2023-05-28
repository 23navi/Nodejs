const express = require("express");
const path= require("path");
const http= require("http");
const cors = require("cors")


const app= express();
const server= http.createServer(app);

app.use(express.urlencoded({extended:true})); //for post request 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());


const planetRouter= require("./routers/planets/planets.router");
const launchRouter= require("./routers/launches/launches.router");
app.use(planetRouter)
app.use(launchRouter);


app.get("/",(req,res)=>{
    res.send("hello");
})

module.exports = {app,server};

