// we will see two aproach... 1) using the url  2) googleapi node package.

// Method2: Using google api package -> npm i googleapis

const express= require("express");
const PORT= process.env.PORT || 3001;
const app= express();
const {google}= require("googleapis");
require('dotenv').config()
const axios=require("axios");

app.use(express.urlencoded({extended:true})); //for post request 
app.use(express.json());


const youtube=google.youtube({
    version:"v3",
    auth:process.env.YTUBE_API_KEY,
})

app.get("/search",async(req,res)=>{
    try{
        const result= await youtube.search.list({
            part:"snippet",
            q:req.query.q,
            type:"video",
        })
        // console.log(result);
        res.send(result.data.items.map((item)=> item.snippet.title));
    }catch(err){
        console.log(err);
        res.send(err);
    }
    
})

app.listen(PORT,()=>{
    console.log("Listening to port ",PORT);
})
