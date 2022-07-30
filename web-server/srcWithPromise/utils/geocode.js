const request=require("postman-request")

const geocode=(name,callback)=>{
    const URL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+name+".json?access_token=pk.eyJ1IjoibmF2aTIzMDgiLCJhIjoiY2twYzU4dDBmMDBxazJvcDcxb2d4Yjd4MiJ9.i1mlZ1G0qqBMxDsq75VLyQ"
    request({url:URL,json:true},(error,response)=>{
        if(error){
            callback("Network Error",undefined)
        }
        else if(response.body.message){
            callback(response.body.message,undefined)
        }
        else{

            if(response.body.features[0]==undefined){
                callback("No result found",undefined)
            }else{
                
                name=(response.body.features[0].place_name)
                long=(response.body.features[0].geometry.coordinates[0])
                lat=(response.body.features[0].geometry.coordinates[1])
                callback(undefined,{long:long,lat:lat,name:name})
                console.log(name)
                console.log(long)
                console.log(lat)
            }
        }
        
    })
}

module.exports=geocode