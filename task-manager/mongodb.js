const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
const ObjectId=mongodb.ObjectId

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName="task-manager"

MongoClient.connect(connectionURL,{useUnifiedTopology: true},(error,client)=>{
    if(error){
    return console.log(error)
    }
    const db=client.db(databaseName)

    // db.collection("task").insertMany([{
    //     description:"hello1",
    //     completed:true
    // },
    // {
    //     description:"hello2",
    //     completed:false
    // },
    // {
    //     description:"hello3",
    //     completed:true
    // }],(error,result)=>{
    //     if(error){
    //         return console.log("There was an error while uploading to the db")
    //     }
    //     console.log(result.ops)
    // })

        db.collection("task").findOne({_id:ObjectId("60b622b79ea102f98b3f84db")},(error,res)=>{
            if (error){
                return console.log("Unable to fetch the data")
            }
            console.log(res)
        })

        db.collection("task").find({completed:true}).toArray((error,res)=>{
            if (error){
                return console.log("error while fetching the data")
            }
            console.log(res)
        })

    // db.collection('user').findOne({ name:"navi" }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })
      
})