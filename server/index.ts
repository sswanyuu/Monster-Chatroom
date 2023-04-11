import express, { Application } from "express";
import http from "http";
import cors from "cors";
import { Server, Socket } from "socket.io";
const app: Application = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined the room ${data}`);
  });
  //data =>messageData
  socket.on("send_message", (data) => {
    //when the room id is same, they will receive the
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running");
});
