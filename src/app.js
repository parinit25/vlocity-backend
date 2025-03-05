require("dotenv").config();
const express = require("express");
const connectDB = require("../config/database");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const Poll = require("../models/poll.model");
const User = require("../models/user.model");

const authRoutes = require("../routes/auth.routes");
const pollRoutes = require("../routes/poll.routes");

const app = express();
const server = createServer(app);

const allowedOrigins = [
  process.env.REACT_APP_URL,
  "https://vlocity-ai-task-fgorjxf0z-parinitsingh06-gmailcoms-projects.vercel.app/",
];

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

connectDB();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("votePoll", async ({ pollId, optionIndex, userId }) => {
    console.log("votePoll", pollId, optionIndex, userId);
    try {
      const poll = await Poll.findById(pollId);
      if (!poll) return socket.emit("error", { message: "Poll not found" });

      const user = await User.findById(userId);
      if (user.votedPolls.includes(pollId)) {
        return socket.emit("error", { message: "You have already voted." });
      }
      poll.options[optionIndex].votes += 1;
      await poll.save();
      user.votedPolls.push(pollId);
      await user.save();
      await poll.populate("createdBy", "firstName lastName");
      await poll.populate("comments.user", "firstName lastName");
      await poll.populate("comments.replies.user", "firstName lastName");

      io.emit("pollUpdated", { pollId, updatedPoll: poll });
    } catch (error) {
      socket.emit("error", { message: "Server error", error: error.message });
    }
  });

  socket.on("addComment", async ({ pollId, text, userId }) => {
    console.log("addComment", pollId, text, userId);
    try {
      const poll = await Poll.findById(pollId);
      if (!poll) return socket.emit("error", { message: "Poll not found" });

      const user = await User.findById(userId);
      if (!user) return socket.emit("error", { message: "User not found" });
      const newComment = poll.comments.create({
        text,
        user: userId,
        firstName: user.firstName,
        lastName: user.lastName,
        replies: [],
      });

      poll.comments.push(newComment);
      await poll.save();

      io.emit("commentAdded", { pollId, comment: newComment });
    } catch (error) {
      socket.emit("error", { message: "Server error", error: error.message });
    }
  });

  socket.on("replyToComment", async ({ pollId, commentId, text, userId }) => {
    console.log("replyToComment", pollId, commentId, text, userId);
    try {
      const poll = await Poll.findById(pollId);
      if (!poll) return socket.emit("error", { message: "Poll not found" });

      const comment = poll.comments.id(commentId);
      if (!comment)
        return socket.emit("error", { message: "Comment not found" });

      const user = await User.findById(userId);
      if (!user) return socket.emit("error", { message: "User not found" });
      const newReply = comment.replies.create({
        text,
        user: userId,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      comment.replies.push(newReply);
      await poll.save();
      await poll.populate("createdBy", "firstName lastName");
      await poll.populate("comments.user", "firstName lastName");
      await poll.populate("comments.replies.user", "firstName lastName");

      io.emit("pollUpdated", { pollId, updatedPoll: poll });
    } catch (error) {
      socket.emit("error", { message: "Server error", error: error.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use("/", (req, res) => {
  res.send({ secretMessage: "Welcome to Polls API" });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
