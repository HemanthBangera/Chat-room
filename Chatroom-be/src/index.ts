import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port:8000});

interface User{
    name: string
    roomid : string,
    socket : WebSocket,
}

let allSockets: User[] = [];

wss.on("connection",(socket)=>{

    socket.on("message",(message:String)=>{
        //@ts-ignore
        const parsedMessage = JSON.parse(message);
        if(parsedMessage.type == "join"){
            allSockets.push({
                roomid:parsedMessage.payload.roomid,
                socket,
                name:parsedMessage.payload.name
            })
            console.log("User joined the room: "+parsedMessage.payload.roomid)
        }

        if(parsedMessage.type == "chat"){
            const currentuserroom = allSockets.find( (x) => x.socket == socket)?.roomid;
            const currentusername = allSockets.find( (x) => x.socket == socket)?.name;

            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i].roomid === currentuserroom){
                    allSockets[i].socket.send(currentusername+":"+parsedMessage.payload.message)
                }
            }
        }
    })
})