const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ text: String, votes: { type: Number, default: 0 } }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comments: [
        {
            text: String,
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            replies: [
                {
                    text: String,
                    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                },
            ],
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Poll", PollSchema);
