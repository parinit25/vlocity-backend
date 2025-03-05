const express = require("express");
const {
  createPoll,
  getPolls,
  getPollDetails,
  getUserPolls,
  getUserVotedPolls,
} = require("../controllers/poll.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createPoll);
router.get("/", getPolls);
router.get("/:pollId", getPollDetails);
router.get("/user/created", authMiddleware, getUserPolls);
router.get("/user/voted", authMiddleware, getUserVotedPolls);

module.exports = router;
