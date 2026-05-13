import "dotenv/config";
import authRoutes from "./routes/auth.rotes.js";
import express from "express";
import cors from "cors";
import pollRoutes from "./routes/poll.route.js";
const app = express();

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});