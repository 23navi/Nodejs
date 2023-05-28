const axios=require("axios");
const qs= require("qs");
require('dotenv').config()

let lastView=0;

const updateTitle =(async()=>{
    let res1= await axios
        .post(
            'https://oauth2.googleapis.com/token',
            qs.stringify({
                refresh_token:process.env.refreshToken,
                grant_type:'refresh_token'
            }),
            {
                auth:{
                    username:process.env.clientID,
                    password:process.env.clientSecret
                }
            }
        )
    const token=res1.data.access_token;
    // console.log(token);


    let res2=await axios
        .get(
            "https://www.googleapis.com/youtube/v3/videos",
            {
                params:{
                    id:"uMKs5uB076U",
                    part:"snippet,statistics",
                    key:process.env.YTUBE_API_KEY,
                }
            },
        );

        let data= res2.data.items[0];
        let {categoryId, title,description,tags}=data.snippet;
        let {viewCount}=data.statistics;
        // console.log(data);

        

        if(lastView!==viewCount){

            await axios
            .put(
                'https://www.googleapis.com/youtube/v3/videos?part=snippet',
                {
                    id:"uMKs5uB076U",
                    snippet:{
                        categoryId,
                        description,
                        tags,
                        title:`This video has ${viewCount} views`,
                    }
                },
                {
                    headers:{
                        authorization:'Bearer '+token
                    }
                }
            )

            console.log("Video title updated from " +lastView+ " to "+ viewCount);
            lastView=viewCount;


        }else{
            console.log("Title was not updated")
        }

        


});

updateTitle();

const cron = require('node-cron');

cron.schedule("00 */5 * * * *",()=>{
    updateTitle();
})




