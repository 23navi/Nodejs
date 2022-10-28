// we will see two aproach... 1) using the url  2) googleapi node package.

// Method1 : Using URL

const express= require("express");
const axios=require("axios");
const PORT= process.env.PORT || 3001;
const app= express();

require('dotenv').config()


app.use(express.urlencoded({extended:true})); //for post request 
app.use(express.json());



let URLString= `https://www.googleapis.com/youtube/v3/search?key=${process.env.YTUBE_API_KEY}&type=video&part=snippet&q=`


console.log(process.env.PORT);


app.get("/search",async(req,res)=>{
    try{
        const result= await axios.get(`${URLString}${req.query.q}`);
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
