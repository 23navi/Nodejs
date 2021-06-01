const mongobd=require('mongodb')
const MongoClient=mongobd.MongoClient

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName="task-manager"

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
    return console.log(error)
    }
    const db=client.db(databaseName)

    db.collection("task").insertMany([{
        description:"hello1",
        completed:true
    },
    {
        description:"hello2",
        completed:false
    },
    {
        description:"hello3",
        completed:true
    }],(error,result)=>{
        if(error){
            return console.log("There was an error while uploading to the db")
        }
        console.log(result.ops)
    })
})