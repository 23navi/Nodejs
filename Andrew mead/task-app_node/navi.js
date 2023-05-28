 const bcrypt=require("bcryptjs");

const myFun=async()=>{
    const pass="Navi2308";
    const hashedPass=await bcrypt.hash(pass,8)
    const hashedPass2=await bcrypt.hash(pass,8)

    console.log(hashedPass);
    console.log(hashedPass2);

    const isMatch=await bcrypt.compare("Navi2308",hashedPass2);
    console.log(isMatch);

    const isMatch2=await bcrypt.compare("Navi2308",hashedPass2);
    console.log(isMatch2);
}


myFun()


// const modulee = {
//     x: 42,
//     getX: function() {
//       return this.x;
//     }
//   };

// console.log(modulee.getX())


// const valide=[40,59,32,22,33,16,40];
// const ages = [32, 33, 16, 40];

// //console.log(ages.every(checkAge))

// function checkAge(age) {
//   return age > 10;
// }

// const aa=(age)=>{
//   return valide.includes(age);  
// }
// console.log(ages.every(aa))
// //console.log(valide.includes(ages))
