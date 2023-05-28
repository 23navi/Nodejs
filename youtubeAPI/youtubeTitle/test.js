const cron= require('node-cron');

cron.schedule("00 */5 * * * *",()=>{
    console.log("hello000");
})