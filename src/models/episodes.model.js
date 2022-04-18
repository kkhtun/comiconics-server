const mongoose = require("mongoose");

const EpisodesSchema = new mongoose.Schema(
    {
        comic_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comics",
            required: true,
        },
        description: String,
        views: [
            {
                type: String,
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Episodes", EpisodesSchema, "episodes");
