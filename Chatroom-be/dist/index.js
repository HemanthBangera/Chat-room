"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 8000;
const wss = new ws_1.WebSocketServer({ port: Number(port) });
const MessageParsed = zod_1.z.object({
    type: zod_1.z.enum(["join", "chat"]),
    payload: zod_1.z.object({
        name: zod_1.z.string().optional(),
        roomid: zod_1.z.string().optional(),
        message: zod_1.z.string().optional()
    })
});
let allSockets = [];
wss.on("connection", (socket) => {
    socket.on("close", () => {
        var _a;
        let userRemoved = (_a = allSockets.find((x) => x.socket === socket)) === null || _a === void 0 ? void 0 : _a.name;
        allSockets = allSockets.filter((user) => user.socket !== socket);
        console.log(userRemoved + " has left");
        for (let user of allSockets) {
            user.socket.send(JSON.stringify({
                type: "left",
                payload: {
                    name: userRemoved,
                }
            }));
        }
        for (let user of allSockets) {
            user.socket.send(JSON.stringify({
                type: "usercount",
                payload: {
                    count: allSockets.filter(u => u.roomid === user.roomid).length
                }
            }));
        }
    });
    socket.on("message", (message) => {
        var _a, _b;
        let tobeparsedMessage;
        try {
            //@ts-ignore
            tobeparsedMessage = JSON.parse(message);
        }
        catch (error) {
            console.log(error);
        }
        const validationResult = MessageParsed.safeParse(tobeparsedMessage);
        if (!validationResult.success) {
            console.log("Invalid inputs");
            socket.close();
            return;
        }
        const parsedMessage = validationResult.data;
        if (parsedMessage.type == "join") {
            allSockets.push({
                roomid: parsedMessage.payload.roomid,
                socket,
                name: parsedMessage.payload.name
            });
            console.log("User joined the room: " + parsedMessage.payload.roomid);
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].roomid === parsedMessage.payload.roomid) {
                    allSockets[i].socket.send(JSON.stringify({
                        type: "join",
                        payload: {
                            name: parsedMessage.payload.name,
                        }
                    }));
                }
            }
            for (let user of allSockets) {
                if (user.roomid === parsedMessage.payload.roomid) {
                    user.socket.send(JSON.stringify({
                        type: "usercount",
                        payload: {
                            count: allSockets.filter(u => u.roomid === user.roomid).length
                        }
                    }));
                }
            }
        }
        if (parsedMessage.type == "chat") {
            const currentuserroom = (_a = allSockets.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.roomid;
            const currentusername = (_b = allSockets.find((x) => x.socket == socket)) === null || _b === void 0 ? void 0 : _b.name;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].roomid === currentuserroom) {
                    allSockets[i].socket.send(JSON.stringify({
                        name: currentusername,
                        message: parsedMessage.payload.message
                    }));
                }
            }
        }
    });
});
