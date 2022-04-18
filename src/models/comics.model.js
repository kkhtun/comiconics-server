const mongoose = require("mongoose");

const ComicsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comics", ComicsSchema, "comics");
