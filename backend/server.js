const app = require("./src/app");
const SocketConnection = require("./src/utils/socket");

const PORT = process.env.PORT || 8080;
const serverSocket = new SocketConnection().connection();
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
  });
  serverSocket.close(() => {
    console.log("Server socket closed");
  });
});