import { WebSocketServer, WebSocket } from "ws";
import {z} from "zod";


const wss = new WebSocketServer({port:8000});

interface User{
    name: string
    roomid : string,
    socket : WebSocket,
}

const MessageParsed = z.object({
    type :z.enum(["join","chat"]),
    payload : z.object({
        name: z.string().optional(),
        roomid: z.string().optional(),
        message:z.string().optional()
    })
})



let allSockets: User[] = [];

wss.on("connection",(socket)=>{

    let userCount = allSockets.length;

    socket.on("close",()=>{
        let userRemoved = allSockets.find((x) => x.socket === socket)?.name;        
        allSockets = allSockets.filter((user)=>user.socket!==socket);
        console.log(userRemoved+" has left")
        for(let user of allSockets){
            user.socket.send(JSON.stringify({
                name:userRemoved,
                message:"has left"
            }))
        }
    })

    socket.on("message",(message:String)=>{
        let tobeparsedMessage:any;


        try{
            //@ts-ignore
            tobeparsedMessage = JSON.parse(message);
        }
        catch(error){
            console.log(error)
        }

        const validationResult = MessageParsed.safeParse(tobeparsedMessage);

        if(!validationResult.success){
            console.log("Invalid inputs");
            socket.close();
            return
        }

        const parsedMessage = validationResult.data;


        if(parsedMessage.type == "join"){
            allSockets.push({
                roomid:parsedMessage.payload.roomid!,
                socket,
                name:parsedMessage.payload.name!
            })
            console.log("User joined the room: "+parsedMessage.payload.roomid)
        }

        if(parsedMessage.type == "chat"){
            const currentuserroom = allSockets.find( (x) => x.socket == socket)?.roomid;
            const currentusername = allSockets.find( (x) => x.socket == socket)?.name;

            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i].roomid === currentuserroom){
                    allSockets[i].socket.send(JSON.stringify({
                        name:currentusername,
                        message:parsedMessage.payload.message
                    }))
                }
            }
        }
    })
})