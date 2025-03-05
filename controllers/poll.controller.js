const Poll = require("../models/poll.model");
const User = require("../models/user.model");

const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    console.log(question, options, "question, options", req.user.id);
    if (!question || options.length < 2) {
      return res.status(400).json({
        message: "Poll must have a question and at least two options.",
      });
    }
    const newPoll = new Poll({
      question,
      options: options.map((text) => ({ text, votes: 0 })),
      createdBy: req.user.id,
    });
    await newPoll.save();
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { createdPolls: newPoll._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Poll created successfully",
      poll: newPoll,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate("createdBy", "firstName lastName");
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPollDetails = async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId)
      .populate("createdBy", "firstName lastName")
      .populate("comments.user", "firstName lastName");
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ createdBy: req.user.id });
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserVotedPolls = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("votedPolls");
    res.status(200).json(user.votedPolls);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createPoll,
  getPolls,
  getPollDetails,
  getUserPolls,
  getUserVotedPolls,
};
