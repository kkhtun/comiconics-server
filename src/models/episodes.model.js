const mongoose = require("mongoose");

const EpisodesSchema = new mongoose.Schema(
    {
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
