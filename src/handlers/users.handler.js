const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);

module.exports = ({ UsersController, USER_ERRORS }) => ({
    createTemplateUser: async (req, res, next) => {
        const { error, value } = Joi.object({
            email: Joi.string().email().required(),
            user_type: Joi.string().valid("READER", "CREATOR").required(),
            password: Joi.string().min(4).required(),
        }).validate(req.body);

        if (error) return next(error);

        try {
            const data = await UsersController.createTemplateUser(value);
            return res.status(201).send(data);
        } catch (e) {
            e.status =
                e.message === USER_ERRORS.VERIFIED_USER_EXISTS ? 400 : 500;
            return next(e);
        }
    },
    sendVerifyEmail: async (req, res, next) => {
        const { error, value } = Joi.object({
            email: Joi.string().email().required(),
        }).validate(req.body);

        if (error) return next(error);

        try {
            const data = await UsersController.sendVerifyEmail(value);
            return res.status(200).send(data);
        } catch (e) {
            if (e.message === USER_ERRORS.VERIFIED_USER_EXISTS) {
                e.status = 400;
            } else if (e.message === USER_ERRORS.NOT_FOUND) {
                e.status = 404;
            } else if (e.message === USER_ERRORS.TOO_MANY_REQUESTS) {
                e.status = 429;
            } else {
                e.status = 500;
            }
            return next(e);
        }
    },
    verifyEmailWithToken: async (req, res, next) => {
        const { error, value } = Joi.object({
            email: Joi.string().email().required(),
            token: Joi.string().length(6).required(),
        }).validate(req.body);

        if (error) return next(error);

        try {
            const data = await UsersController.verifyEmailWithToken(value);
            return res.status(200).send(data);
        } catch (e) {
            if (
                e.message === USER_ERRORS.VERIFIED_USER_EXISTS ||
                e.message === USER_ERRORS.EXPIRED_TOKEN ||
                e.message === USER_ERRORS.TOO_MANY_TRIES ||
                e.message === USER_ERRORS.INVALID_TOKEN ||
                e.message === USER_ERRORS.UNVERIFIED_USER
            ) {
                e.status = 400;
            } else if (e.message === USER_ERRORS.NOT_FOUND) {
                e.status = 404;
            } else {
                e.status = 500;
            }
            return next(e);
        }
    },
    login: async (req, res, next) => {
        const { error, value } = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
        }).validate(req.body);

        if (error) return next(error);

        try {
            const data = await UsersController.login(value);
            return res.status(200).send(data);
        } catch (e) {
            if (
                e.message === USER_ERRORS.INVALID_CREDENTIALS ||
                e.message === USER_ERRORS.UNVERIFIED_USER
            ) {
                e.status = 400;
            } else {
                e.status = 500;
            }
            return next(e);
        }
    },
});
