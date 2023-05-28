const {parse}= require("csv-parse")
const fs= require("fs")


const habitablePlanetList=[]

const isHabitablePlanet= (planet)=>{
    return planet['koi_disposition']==='CONFIRMED' &&
    planet["koi_insol"]>.36 && planet["koi_insol"]<1.11 &&
    planet['koi_prad']<1.6;
}

fs.createReadStream("./kepler_data.csv")
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
    })
    .on("end",()=>{
        console.log(habitablePlanetList.length);
    })



