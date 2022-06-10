const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Likes", LikesSchema, "likes");
