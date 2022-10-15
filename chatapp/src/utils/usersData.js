const users=[]

//addUser

const addUser=({id,username,room})=>{
    username=username.trim().toLowerCase();
    room=room.trim().toLowerCase()
    if(!username || !room){
        return {
            error:"Username and room is required",
        }
    }

    //check if the no user with given same exist in the room already
    const existUser= users.find(user=>{
        return user.username==username && user.room==room
    })

    if(existUser){
        return {
            error:"Please user other username"
        }
    }

    const user={id,username,room}
    users.push(user)
    return {
        user
    }
}



// remove user

const removeUser=(id)=>{
    const index=users.findIndex(user => user.id === id) 
    if(index!==-1){
        return {user:users.splice(index, 1)[0] }  // users.slice return an array of removed objects and its mutable.. so it cahnges the users array... as we know we only remove one user so we did [0] to get the removed user
    }
    return {
        error: "No such user"
    }
    
}


//get user by id

const getUser=(id)=>{
    const user= users.find(user=>user.id==id )
    if(!user){
        return {
            error:"No such user"
        }
    }
    return {
        user
    }
}



// find all users in a given room

const getUserInRoom=(room)=>{
    const roomUser=users.filter((user)=>user.room==room);
    return roomUser
}



module.exports={getUser,getUserInRoom,addUser,removeUser}