import React, { useEffect, useRef } from "react";
import { useState } from "react";


const Landing = () => {

    const [displayroom, setDisplayroom] = useState(false);
    const [roomid,setRoomid] = useState<string>()
    const nameRef = useRef<HTMLInputElement | null>(null);
    const roomidRef = useRef<HTMLInputElement>(null);
    const socketRef = useRef<WebSocket>(null);
    const [chatinterface,setChatinterface] = useState(true)

    useEffect(()=>{
        initializeSocketConnection()

        return ()=>{
            if(socketRef.current){
                socketRef.current.close();
            }
        }
    },[])

    function roomidgenerator(length: number=6):string{
        let characters = 'QWERTYUIOPASDFGHJKLZXCVBNM789456123';
        let result = '';
        for(let i=0;i<length;i++){
            let randomind = Math.floor(Math.random()*characters.length);
            result += characters[randomind];

        }
        return result;
    }
    
    function render():void{
        setDisplayroom(true);
        setRoomid(roomidgenerator())
    }

    function backendCall(){
        const name = nameRef.current?.value;
        const roomid = roomidRef.current?.value;
        if(socketRef.current?.readyState === WebSocket.OPEN){
            socketRef.current.send(
                JSON.stringify({
                    type:"join",
                    payload: { name, roomid }
                })
            )
            console.log("Sent the join message");
        } else {
            console.error("WebSocket not open yet");
        }
    }

    function initializeSocketConnection(){
        socketRef.current = new WebSocket("ws://localhost:8000");
        console.log("attempting to connect to the websocket server")
        socketRef.current.onopen = () =>{
            console.log("Connected to the websocket server");
        }
        socketRef.current.onmessage = (event)=>{
            console.log("Received message:",event.data)
        }
        socketRef.current.onerror = (error) =>{
            console.log("Received error:",error)
        }
    }

    function groupbyFunctions(){
        setChatinterface(true);
        backendCall();
    }



    return(

        <>
        
           {!chatinterface && <div className="bg-black h-screen w-screen flex justify-center items-center">
            <div className="border-2 border-gray-700 rounded-xl p-8 bg-black w-1/2 font-jetbrains flex flex-col gap-2 justify-between">
            <div>
                <h2 className="text-3xl  text-white mb-2">
                    Real time chat
                </h2>
                <span className="text-gray-500">temporary room that expires after all users exit</span>
            </div>
                <div className="flex items-center justify-center">
                    <button className="bg-white rounded h-12 w-full font-bold" onClick={render}>
                        Create New Room
                    </button>
                </div>
                <div>
                    <input type="text" className="bg-black border-2 border-gray-700 rounded h-10 w-full pl-2 text-white" ref={roomidRef} placeholder="Enter Your Room Number"/>
                </div>
                <div>
                    <input type="text" className="bg-black border-2 border-gray-700 rounded h-10 w-3/4 pl-2 text-white" ref={nameRef} placeholder="Enter your name"/>
                    <button className="bg-white w-36 ml-7 h-10 rounded font-bold" onClick={groupbyFunctions } >Join Room</button>
                </div>
                {
                    displayroom && <div className="bg-gray-69 h-40 rounded p-2">
                        <div className="text-gray-500 flex justify-center">Share this code with your friends</div>
                        <div className="text-3xl flex justify-center mt-4 font-bold text-white">{roomid}</div>
                    </div>
                }
            </div>
        </div>}

        {
            chatinterface &&
            <div className="bg-black h-screen w-screen flex justify-center items-center">
                    <div className="border-2 border-gray-700  w-2/5 rounded-xl font-jetbrains">
                    <div className="m-7"> 
                        <h1 className="text-white text-2xl">Real Time Chat</h1>
                        <span className="text-gray-500">temporary room that expires after all users exit</span>
                    </div>
                    <div className="bg-gray-69 ml-7 mr-7 mt-4 text-gray-300 rounded-md h-12 p-2 flex justify-between items-center">
                            <span>Room Code:</span>
                            <span>User:</span>
                    </div>
                    <div className="border-2 border-gray-700 h-96 m-7 rounded-md "></div>
                    <div className="m-7 flex justify-between">
                        <input type="text" className="w-3/4 h-10 rounded-sm bg-black border-2 border-gray-700 text-white p-2" style={{ caretColor: '#FFFFFF' }} placeholder="Type a message..."/>
                        <button className="bg-white h-10 w-28 rounded-sm">Send</button>
                    </div>
                    </div>
            </div>
        }


        </>
    )
}

export default Landing;