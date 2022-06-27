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
        email_verification: EmailVerificationSchema,
        is_email_verified: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
        minimize: false,
    }
);

UsersSchema.index({ firebase_id: 1 });

UsersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UsersSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

module.exports = mongoose.model("Users", UsersSchema, "users");
