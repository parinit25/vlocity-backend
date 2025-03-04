const express = require("express");
const {
  createPoll,
  getPolls,
  votePoll,
  getPollDetails,
  addComment,
  replyToComment,
  getUserPolls,
  getUserVotedPolls,
} = require("../controllers/poll.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createPoll); // Create a new poll
router.get("/", getPolls); // Get all polls
router.post("/vote", authMiddleware, votePoll); // Vote on a poll
router.get("/:pollId", getPollDetails); // Get poll details
router.post("/:pollId/comment", authMiddleware, addComment); // Add a comment to a poll
router.post(
  "/:pollId/comment/:commentId/reply",
  authMiddleware,
  replyToComment
); // Reply to a comment
router.get("/user/created", authMiddleware, getUserPolls); // Get polls created by the user
router.get("/user/voted", authMiddleware, getUserVotedPolls); // Get polls user has voted on

module.exports = router;
