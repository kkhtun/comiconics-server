const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
    {
        episode_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Episodes",
            required: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comments", CommentsSchema, "comments");
