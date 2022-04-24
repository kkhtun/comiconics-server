const moment = require("moment");
const jwt = require("jsonwebtoken");
const R = require("ramda");
module.exports = ({ UsersModel, USER_ERRORS }) => ({
    getOneUserByFilter: async (query) => {
        const user = await UsersModel.findOne(query).lean().exec();
        if (!user) throw new Error(USER_ERRORS.NOT_FOUND);
        return user;
    },
    findOneOrCreateUnverifiedUser: async ({ email, user_type, password }) => {
        const existingUser = await UsersModel.findOne({ email }).exec();
        if (existingUser) {
            if (existingUser.is_email_verified === true) {
                throw new Error(USER_ERRORS.VERIFIED_USER_EXISTS);
            }
            existingUser.user_type = user_type;
            existingUser.password = password;
            return await existingUser.save();
        }
        const user = new UsersModel({
            email,
            user_type,
            password,
            email_verification: {},
        });
        return await user.save();
    },
    generateVerificationToken: async ({ email }) => {
        // Declare all characters and pick randomly
        let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        let token = "";
        for (let i = 0; i < 6; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        const existingUser = await UsersModel.findOne({ email }).exec();

        if (!existingUser) {
            throw new Error(USER_ERRORS.NOT_FOUND);
        }

        const { is_email_verified } = existingUser;
        const currentTime = moment().utc();

        if (is_email_verified === false) {
            if (
                existingUser.email_verification.token_created_at &&
                Math.abs(
                    moment(existingUser.email_verification.token_created_at)
                        .utc()
                        .diff(currentTime, "seconds")
                ) < 30
                // throttle 30 seconds for token generation
            ) {
                throw new Error(USER_ERRORS.TOO_MANY_REQUESTS);
            }
            existingUser.email_verification.token = token;
            existingUser.email_verification.token_created_at =
                currentTime.format();
            existingUser.email_verification.tries = 0;
            await existingUser.save();
            return token;
        } else {
            throw new Error(USER_ERRORS.VERIFIED_USER_EXISTS);
        }
    },
    verifyEmailWithToken: async ({ email, token }) => {
        const user = await UsersModel.findOne({ email }).exec();
        if (!user) throw new Error(USER_ERRORS.NOT_FOUND);

        const currentTime = moment().utc();
        const { is_email_verified, email_verification } = user;

        if (is_email_verified === true) {
            throw new Error(USER_ERRORS.VERIFIED_USER_EXISTS);
        }
        // token expiry time 5 minutes
        if (
            moment(email_verification.token_created_at)
                .utc()
                .diff(currentTime, "seconds") > 300
        ) {
            throw new Error(USER_ERRORS.EXPIRED_TOKEN);
        }

        if (email_verification.tries > 2) {
            throw new Error(USER_ERRORS.TOO_MANY_TRIES);
        }

        if (email_verification.token === token) {
            user.is_email_verified = true;
            return await user.save();
        } else {
            user.email_verification.tries++;
            await user.save();
            throw new Error(USER_ERRORS.INVALID_TOKEN);
        }
    },
    generateJsonWebToken: async ({ email, password }) => {
        const user = await UsersModel.findOne({ email }).exec();
        if (!user) {
            throw new Error(USER_ERRORS.INVALID_CREDENTIALS);
        }
        const isPasswordCorrect = await user.validatePassword(password);
        if (isPasswordCorrect) {
            // might need more secure patterns of authentication later
            return {
                token: await jwt.sign(
                    R.pick(["_id", "email", "name"], user),
                    process.env.JWT_SECRET
                ),
            };
        } else {
            throw new Error(USER_ERRORS.INVALID_CREDENTIALS);
        }
    },
});
