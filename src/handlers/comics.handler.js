const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);

module.exports = ({ ComicsController }) => ({
    createComic: async (req, res, next) => {
        const { error, value } = Joi.schema({
            title: Joi.string().required(),
            description: Joi.string().required(),
            cover: Joi.string(),
            creator: Joi.objectid().required(),
        }).validate(req.body);

        if (error) return next(error);

        try {
            const comic = await ComicsController.createComic(value);
            return res.status(201).send(comic);
        } catch (e) {
            return next(e);
        }
    },
});
