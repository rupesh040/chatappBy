import { Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors:  {
        origin: 'https://chat.hyweb.in', // Frontend origin
        methods: ['GET', 'POST'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
        credentials: true // Enable credentials (cookies)
    }
    ,});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {};

io.on("connection", (socket) => { // Removed space after "connection"
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export {io, app, server};
