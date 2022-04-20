const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);

module.exports = ({ ComicsController, USER_ERRORS }) => ({
    createComic: async (req, res, next) => {
        const { error, value } = Joi.object({
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
            e.status = e.message === USER_ERRORS.NOT_FOUND ? 404 : 500;
            return next(e);
        }
    },
    getComics: async (req, res, next) => {
        const { error, value } = Joi.schema({
            limit: Joi.number().integer().default(10),
            skip: Joi.number().integer().default(0),
        }).validate(req.query);

        if (error) return next(error);

        try {
            const data = await ComicsController.createComic(value);
            return res.status(200).send(data);
        } catch (e) {
            return next(e);
        }
    },
});