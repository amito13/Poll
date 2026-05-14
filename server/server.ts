import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import pollRoutes from "./routes/poll.route.js";
const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST"],
//   },
// });
//import { setIo } from "./socket.js";
//setIo(io);
//io.on("connection", (socket) => {

//   console.log("User connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });

// });
app.use(cors({
  origin: process.env.FRONTEND_URL||"http://localhost:5173",
}));


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});