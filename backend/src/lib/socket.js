import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// socket.io setup
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// get receiver socket id
export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

// object to store online users
const userSocketMap = {}; // {userId: socketId}

// socket.io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // get userId from query
  const userId = socket.handshake.query.userId;

  // if userId exists, add it to the userSocketMap
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // io.emit() is used to send a message to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // disconnect event and remove user from online users
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
