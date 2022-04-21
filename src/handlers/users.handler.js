const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);

module.exports = ({ UsersController, USER_ERRORS }) => ({
    sendRegistryEmail: async (req, res, next) => {
        const { error, value } = Joi.object({
            email: Joi.string().email().required(),
        }).validate(req.body);

        if (error) return next(error);

        try {
            const data = await UsersController.sendRegistryEmail(value);
            return res.status(201).send(data);
        } catch (e) {
            return next(e);
        }
    },
});
