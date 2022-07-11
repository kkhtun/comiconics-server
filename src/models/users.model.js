const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EmailVerificationSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    token_created_at: {
        type: Date,
    },
    tries: {
        type: Number,
        default: 0,
    },
    _id: false,
});

const UsersSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        name: {
            type: String,
        },
        user_type: {
            type: String,
            required: true,
            enum: ["ADMIN", "CREATOR", "READER"],
            default: "READER",
        },
        favourites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comics",
            },
        ],
        firebase_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        minimize: false,
    }
);

UsersSchema.index({ firebase_id: 1 });

module.exports = mongoose.model("Users", UsersSchema, "users");
