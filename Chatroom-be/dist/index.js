"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8000 });
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a, _b;
        //@ts-ignore
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type == "join") {
            allSockets.push({
                roomid: parsedMessage.payload.roomid,
                socket,
                name: parsedMessage.payload.name
            });
            console.log("User joined the room: " + parsedMessage.payload.roomid);
        }
        if (parsedMessage.type == "chat") {
            const currentuserroom = (_a = allSockets.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.roomid;
            const currentusername = (_b = allSockets.find((x) => x.socket == socket)) === null || _b === void 0 ? void 0 : _b.name;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].roomid === currentuserroom) {
                    allSockets[i].socket.send(currentusername + ":" + parsedMessage.payload.message);
                }
            }
        }
    });
});
