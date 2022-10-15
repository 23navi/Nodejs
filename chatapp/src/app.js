// if(process.env.NODE_ENV !=="production"){
//     require('dotenv').config();
// }

const http= require("http");
const express = require("express");
const path= require("path"); // core node module
const ejsMate = require('ejs-mate');
const methodoverride=require("method-override");
const Filter= require("bad-words");

const {genMessage,genLocMessage}= require("./utils/message");
const {getUser,getUserInRoom,addUser,removeUser}= require("./utils/usersData");


require("./db/mongoose"); 

const app= express();

const server= http.createServer(app);
const socketio= require("socket.io");
const io= socketio(server);



app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'))



app.use(express.urlencoded({extended:true})); //for post request 
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname, '../public')));  // as index.js and app.js is inside src/
app.use(express.json());


//let count=0;
io.on("connection",(socket)=>{
    //console.log(socket);
    // socket.emit("welcome",genMessage("Welcome Naviiiiii"));
    

    socket.on("joint",({username,room},cb)=>{
        const {user,error}= addUser({id:socket.id,username,room})
        if(error){
            return cb(error)
        }
        //note : as the addUser also trims the input.. we are using return value .. not directly room and username from parameter
        socket.join(user.room);
        socket.emit("welcome",genMessage(username,`Welcome ${user.username}`));
        socket.broadcast.to(room).emit("new",genMessage(user.username));

        io.to(user.room).emit("roomDate",({
            roomName:user.room,
            users:getUserInRoom(user.room)
        }))
    })



    socket.on("sendMessage",(message,cb)=>{

        const{user,error}= getUser(socket.id);
        if(error){
            return
        }
        const filter= new Filter;
        if(filter.isProfane(message)){
            return cb(message);
        }
        io.to(user.room).emit("message",genMessage(user.username,message));
        cb();
    })



    socket.on("sendLocation",(loc,cb)=>{
        const{user,error}= getUser(socket.id);
        if(error){
            return
        }
        const url=`https://google.com/maps?q=${loc.lat},${loc.lon}`;
        io.to(user.room).emit("sendLocation",genLocMessage(user.username,url))
        cb();
    })



    socket.on("disconnect",()=>{
        const {user,error}=removeUser(socket.id);
        if(user){
            io.to(user.room).emit("left",genMessage(user.username));
            io.to(user.room).emit("roomDate",({
                roomName:user.room,
                users:getUserInRoom(user.room)
            }))
        }
        
    })



    
})


module.exports = {app,server}








//npm init
//touch .gitignore
//add node_modules and .env inside
//git init

//npm i express ejs 
//npm install --save-dev nodemon
// npm i ejs-mate method-override mongoose 
// in package.json add =>  "start":"node src/index.js", "dev":"nodemon src/index.js",
// note : we do npm run dev and npm start
