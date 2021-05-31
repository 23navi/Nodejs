const forecast = require("./utils/weather.js");
const geocode = require("./utils/geocode.js");


place =process.argv[2]
if(!place){
    console.log("Please provide the location")
}else{


    geocode(place,(error,response)=>{
        if(error){
            console.log(error)
        }else{
            forecast(response.lat,response.long,(error,res)=>{
                if(error){
                    console.log(error)
                }else{
                    console.log(response.name)
                    console.log(res)
                }
            })
        }
    })
}