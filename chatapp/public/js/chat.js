const socket=io();

const {username,room}= Qs.parse(location.search,{ignoreQueryPrefix:true})
 

socket.emit("joint",{username,room},(message)=>{
  alert(message);
  location.href="/";
});


const $locButton= document.querySelector("#share-location");
const $messageSection = document.querySelector("#messageSection");



//mustache templates
const $message_template= document.querySelector("#message_template").innerHTML;
const $location_template=document.querySelector("#location_template").innerHTML;

const $groupDesc_template=document.querySelector("#groupDesc_template").innerHTML;
const $sidebar_template=document.querySelector("#sidebar_template").innerHTML;



const autoScroll=()=>{
  $messageSection.scrollTop = $messageSection.scrollHeight
}

  socket.on("message",(data)=>{
    const htmlDate= Mustache.render($message_template,{
      message:data.message,
      username:data.username,
      // formating time with moment lib
      "timeStamp": moment(data.createdAt).format("h:mm a")
    })
    $messageSection.insertAdjacentHTML("beforeend",htmlDate);
    autoScroll()
  })



  socket.on("welcome",(data)=>{
    const htmlDate= Mustache.render($groupDesc_template,{
      message:data.message
    })
    $messageSection.insertAdjacentHTML("beforeend",htmlDate);
  })


  socket.on("new",(data)=>{
    const htmlDate= Mustache.render($groupDesc_template,{
      message: `${data.username} join the room at ${moment(data.createdAt).format("h:mm a")}`
    })
    $messageSection.insertAdjacentHTML("beforeend",htmlDate);
    autoScroll()
  })




  socket.on("left",(data)=>{
    const htmlDate= Mustache.render($groupDesc_template,{
      message: `${data.username} left the room at ${moment(data.createdAt).format("h:mm a")}`
    })
    $messageSection.insertAdjacentHTML("beforeend",htmlDate);
    autoScroll()
  })


  socket.on("sendLocation",(data)=>{
    const htmlDate= Mustache.render($location_template,{
      username:data.username,
      URL:data.url,
      "timeStamp": moment(data.createdAt).format("h:mm a")
    })
    $messageSection.insertAdjacentHTML("beforeend",htmlDate);
    autoScroll()
  })


  socket.on("roomDate",({roomName,users})=>{
   
    const htmlData= Mustache.render($sidebar_template,{
      roomName,
      users
    })
    document.querySelector(".chat__sidebar").innerHTML=htmlData

  })


 


document.querySelector("#msg-form").addEventListener("submit",(e)=>{
  e.preventDefault()
  const mes= e.target.elements.msg.value
  
  socket.emit("sendMessage",mes,(returnMessage)=>{
    if(returnMessage){  // this means that message contains profanity and we will prefill user's input box so that he can edit the text before sending agian
      console.log("Profanity is not allowed")
      e.target.elements.msg.focus();
      return e.target.elements.msg.value=returnMessage;  
    }
    e.target.elements.msg.focus();
    e.target.elements.msg.value="";  
    console.log("Message send");

  });
})



$locButton.addEventListener("click",()=>{
  
  if(!navigator.geolocation){return alert("No support")}
  $locButton.setAttribute("disabled","disabled");
  navigator.geolocation.getCurrentPosition((pos)=>{
    socket.emit("sendLocation",{lon:pos.coords.longitude,lat:pos.coords.latitude},()=>{
      console.log("Location shared");
      $locButton.removeAttribute("disabled");
    })
  })
})

