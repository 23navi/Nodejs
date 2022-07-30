const request=require("postman-request")


function forecast(lat,long){
    const URL="http://api.weatherstack.com/current?access_key=273c96b792b14e51db1f2d13dd8c5b8f&query="+lat+","+long
    
        return new Promise((res,rej)=>{
            request({url:URL,json:true},(error,response)=>{
            if(error){
                rej("Sorry, network error")
            }else if(response.body.error){
                rej("Unable to find the location")
            }else{
                const data=((response.body))
                res(`Current temperature is ${data.current.temperature}\u00B0C but it feels like ${data.current.feelslike}\u00B0C`)
            }
        })
        
        
    })

}

module.exports=forecast
