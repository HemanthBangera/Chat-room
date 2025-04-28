import React, { useEffect, useRef } from "react";
import { useState } from "react";

const Landing = () => {
  const [displayroom, setDisplayroom] = useState(false);
  const [createdRoomid, setCreatedRoomid] = useState<string>();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const roomidRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const endMessageRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket>(null);
  const [username, setUsername] = useState<string>();
  const [chatinterface, setChatinterface] = useState(false);
  const [userCount,setUserCount] = useState(0);
  const [chatRoomId,setChatRoomId] = useState<string>();
  const [messages, setmessages] = useState<{ name: string; message: string }[]>(
    []
  );

  useEffect(() => {
    initializeSocketConnection();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (endMessageRef.current) {
      endMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function roomidgenerator(length: number = 6): string {
    let characters = "QWERTYUIOPASDFGHJKLZXCVBNM789456123";
    let result = "";
    for (let i = 0; i < length; i++) {
      let randomind = Math.floor(Math.random() * characters.length);
      result += characters[randomind];
    }
    return result;
  }

  function render(): void {
    setDisplayroom(true);
    setCreatedRoomid(roomidgenerator());
  }

  function backendCall() {
    const name = nameRef.current?.value;
    const roomid = roomidRef.current?.value;
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "join",
          payload: { name, roomid },
        })
      );
      setUsername(name);
      setChatRoomId(roomid)
      console.log("Sent the join message");
    } else {
      console.error("WebSocket not open yet");
    }
  }

  function initializeSocketConnection() {
    socketRef.current = new WebSocket("wss://calm-missy-hemanthbangera-e626229c.koyeb.app");
    console.log("attempting to connect to the websocket server");
    socketRef.current.onopen = () => {
      console.log("Connected to the websocket server");
    };
    socketRef.current.onmessage = (event) => {
      const receivedMessages = JSON.parse(event.data);

      if (receivedMessages.type === "join" || receivedMessages.type === "left") {
        const action = receivedMessages.type === "join" ? "joined" : "left";
        setmessages((prevmessage) => [
          ...prevmessage,
          {
            name: "system",
            message: `${receivedMessages.payload.name} ${action} the chat`,
          },
        ]);
      }
      else if (receivedMessages.type === "usercount") {
        setUserCount(receivedMessages.payload.count);
      }
      else {
        setmessages((prevmessage) => [...prevmessage, receivedMessages]);
      }
    };
    socketRef.current.onerror = (error) => {
      console.log("Received error:", error);
    };
  }

  function groupbyFunctions() {
    const roomid = roomidRef.current?.value.trim();
    const name = nameRef.current?.value.trim();
    let isValidRoomid = (id: string) => /^[A-Z0-9]{6}$/.test(id);

    if (roomid && name && isValidRoomid(roomid)) {
      backendCall();
      setChatinterface(true);
    }
  }

  function sendMessage() {
    const message = messageRef.current!.value.trim();
    if (message && message.length > 0) {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            type: "chat",
            payload: { message },
          })
        );
        messageRef.current!.value = "";
      }
    }
  }

  return (
    <>
      {!chatinterface && (
        <div className="bg-black min-h-screen w-screen flex justify-center items-center p-4">
          <div className="border-2 border-gray-700 rounded-xl p-10 bg-black w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl font-jetbrains flex flex-col gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl text-white mb-2">Real time chat</h2>
              <span className="text-gray-500 text-sm sm:text-base">
                Temporary room that expires after all users exit
              </span>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-white rounded h-12 w-full font-bold"
                onClick={render}
              >
                Create New Room
              </button>
            </div>
            <div>
              <input
                type="text"
                className="bg-black border-2 border-gray-700 rounded h-10 w-full pl-2 text-white"
                ref={roomidRef}
                placeholder="Enter Your Room Code"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <input
                type="text"
                className="bg-black border-2 border-gray-700 rounded h-10 w-full pl-2 text-white"
                ref={nameRef}
                placeholder="Enter your name"
              />
              <button
                className="bg-white w-full sm:w-36 h-10 rounded font-bold"
                onClick={groupbyFunctions}
              >
                Join Room
              </button>
            </div>
            {displayroom && (
              <div className="bg-gray-69 h-32 sm:h-40 rounded p-2 flex flex-col justify-center items-center">
                <div className="text-gray-400 text-sm sm:text-base mb-2">
                  Share this code with your friends
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {createdRoomid}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
  
      {chatinterface && (
        <div className="bg-black min-h-screen w-screen flex justify-center items-center p-4">
          <div className="border-2 border-gray-700 w-full max-w-2xl lg:max-w-3xl rounded-xl font-jetbrains">
            <div className="m-4 sm:m-7">
              <h1 className="text-white text-xl sm:text-2xl">Real Time Chat</h1>
              <span className="text-gray-500 text-sm sm:text-base">
                Temporary room that expires after all users exit
              </span>
            </div>
            <div className="bg-gray-69 mx-4 sm:mx-7 mt-4 text-gray-300 rounded-md h-12 p-2 flex justify-between items-center text-sm sm:text-base">
              <span>Room Code: {chatRoomId}</span>
              <span>Users: {userCount}</span>
            </div>
            <div className="border-2 border-gray-700 h-80 sm:h-96 m-4 sm:m-7 rounded-md text-white overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.name === "system"
                      ? "justify-center"
                      : msg.name === username
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-md inline-block max-w-[80%] break-words p-2 m-1 ${
                      msg.name === "system"
                        ? "bg-transparent text-gray-400 text-xs sm:text-sm"
                        : "bg-white text-black"
                    }`}
                  >
                    {msg.name}: {msg.message}
                  </div>
                </div>
              ))}
              <div ref={endMessageRef}></div>
            </div>
            <div className="m-4 sm:m-7 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                className="w-full h-10 rounded-sm bg-black border-2 border-gray-700 text-white p-2"
                ref={messageRef}
                style={{ caretColor: "#FFFFFF" }}
                placeholder="Type a message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button
                className="bg-white h-10 w-full sm:w-28 rounded-sm"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
};

export default Landing;
