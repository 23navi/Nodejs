
const {parse}= require("csv-parse")
const fs= require("fs")
const path= require("path")


const habitablePlanetList=[]

const isHabitablePlanet= (planet)=>{
    return planet['koi_disposition']==='CONFIRMED' &&
    planet["koi_insol"]>.36 && planet["koi_insol"]<1.11 &&
    planet['koi_prad']<1.6;
}

function loadPlanetsData(){
    return new Promise((res,rej)=>{
        fs.createReadStream(path.join(__dirname,"..","data","kepler_data.csv"))
        // fs.createReadStream("../data/kepler_data.csv")  why the fuck this is not working???
        .pipe(parse({
            comment:'#',
            columns:true
        }))
        .on("data",(data)=>{
            if(isHabitablePlanet(data)){
                habitablePlanetList.push(data);
            }
        })
        .on("error",(err)=>{
            console.log(err)
            rej()
        })
        .on("end",()=>{
            console.log(habitablePlanetList.length);
            res()
        })
    })
}


    module.exports={
        loadPlanetsData,
        planets:habitablePlanetList,
    }