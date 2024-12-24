const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const userService = require("../services/user.service");
const socket = require("../config/socket.config");

class SocketConnection {
  server;
  static io;
  static userSocketMap = {};
  constructor() {
    const app = express();
    this.server = http.createServer(app);
    this.server.listen(socket.port, () => {
      console.log(`server running at http://localhost:${socket.port}`);
    });
    SocketConnection.io = new Server(this.server, {
      cors: {
        origin: socket.cors_url,
        methods: ["GET", "POST"],
      },
    });
  }

  static getReceiverSocketId = (receiverId) => {
    return SocketConnection.userSocketMap[receiverId];
  };

  connection() {
    SocketConnection.io.on("connection", (socket) => {
      console.log("A user connected", socket.id);
      // getOnlineUsers
      const userId = socket.handshake.query.userId;
      if (userId !== undefined)
        SocketConnection.userSocketMap[userId] = socket.id;
      console.log(SocketConnection.userSocketMap);
      SocketConnection.io.emit(
        "getOnlineUsers",
        Object.keys(SocketConnection.userSocketMap)
      );

      socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete SocketConnection.userSocketMap[userId];
        SocketConnection.io.emit(
          "getOnlineUsers",
          Object.keys(SocketConnection.userSocketMap)
        );
        if (userId) userService.updateLatestOnlineAt(userId);
      });
    });

    return this.server;
  }
}
module.exports = SocketConnection;
