const genMessage=(username,message="")=>{
    return{
        username,
        message,
        "createdAt": new Date().getTime(),
    }
}

const genLocMessage=(username,url)=>{
    return{
        username,
        url,
        "createdAt": new Date().getTime(),
    }
}

module.exports={genMessage,genLocMessage};