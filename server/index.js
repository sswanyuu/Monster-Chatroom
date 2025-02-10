import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { pipeline } from "@xenova/transformers";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  const classifier = await MyClassificationPipeline.getInstance();
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined the room ${data}`);
  });
  //data =>messageData
  socket.on("send_message", async (data) => {
    const classification = await classifier(data.message);
    const label = classification[0]?.label || "UNKNOWN";
    const score = classification[0]?.score || 0;
    const processedMessage = {
      ...data,
      classification: { label, score },
    };
    console.log("🚀 ~ socket.on ~ processedMessage:", processedMessage);

    socket.to(data.room).emit("receive_message", processedMessage);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

class MyClassificationPipeline {
  static task = "text-classification";
  static model = "Xenova/distilbert-base-uncased-finetuned-sst-2-english";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

MyClassificationPipeline.getInstance();

server.listen(3001, () => {
  console.log("Server running");
});
