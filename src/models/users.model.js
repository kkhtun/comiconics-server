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
        user_type: {
            type: String,
            required: true,
            enum: ["ADMIN", "CREATOR", "READER"],
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
