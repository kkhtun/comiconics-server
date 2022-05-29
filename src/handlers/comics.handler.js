const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);

module.exports = ({ ComicsController, USER_ERRORS, COMIC_ERRORS }) => ({
    createComic: async (req, res, next) => {
        const { error, value } = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
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
        const { error, value } = Joi.object({
            limit: Joi.number().integer().default(10),
            skip: Joi.number().integer().default(0),
        }).validate(req.query);

        if (error) return next(error);

        try {
            const data = await ComicsController.getComics(value);
            return res.status(200).send(data);
        } catch (e) {
            return next(e);
        }
    },
    getOneComic: async (req, res, next) => {
        const { error, value } = Joi.object({
            _id: Joi.objectid().required(),
        }).validate(req.params);

        if (error) return next(error);

        try {
            const data = await ComicsController.getOneComic(value);
            return res.status(200).send(data);
        } catch (e) {
            e.status = e.message === COMIC_ERRORS.NOT_FOUND ? 404 : 500;
            return next(e);
        }
    },
    updateComic: async (req, res, next) => {
        const { error, value } = Joi.object({
            title: Joi.string(),
            description: Joi.string(),
            cover: Joi.string().uri(),
            _id: Joi.objectid().required(),
        }).validate({ ...req.body, ...req.params });

        if (error) return next(error);

        try {
            const data = await ComicsController.updateComic(value);
            return res.status(200).send(data);
        } catch (e) {
            e.status = e.message === COMIC_ERRORS.NOT_FOUND ? 404 : 500;
            return next(e);
        }
    },
});
