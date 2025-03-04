const express = require("express");
const connectDB = require("../config/database");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

// Routes
const authRoutes = require("../routes/auth.routes");
const pollRoutes = require("../routes/poll.routes");

const app = express();
const server = createServer(app);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const io = new Server(server);
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };
