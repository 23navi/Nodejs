const forecast = require("./weather.js");
const geocode = require("./geocode.js");


place ="kolkata"
geocode(place,(error,response)=>{
    if(error){
        console.log(error)
    }else{
        forecast(response.lat,response.long,(error,res)=>{
            if(error){
                console.log(error)
            }else{
                console.log(res)
            }
        })
    }
})
