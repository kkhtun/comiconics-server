const mongoose = require("mongoose");
const R = require("ramda");

const ChaptersSchema = new mongoose.Schema(
    {
        comic_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comics",
            required: true,
        },
        title: {
            type: String, // eg. Chapter One
            required: true,
        },
        description: String,
        thumbnail: String,
        images_folder_url: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Chapters", ChaptersSchema, "chapters");
