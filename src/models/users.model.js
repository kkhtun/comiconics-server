const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
        },
        favourites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comics",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Users", UsersSchema, "users");
