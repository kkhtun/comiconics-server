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
        thumbnail: {
            type: String,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
            },
        ],
        genres: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Genres",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comics", ComicsSchema, "comics");
