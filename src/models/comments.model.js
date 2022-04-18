const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
    {
        comic_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comics",
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
