const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);

module.exports = ({ GenresController }) => ({
    createGenre: async (req, res, next) => {
        const { error, value } = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().optional(),
        }).validate(req.body);

        if (error) return next(error);

        try {
            const genre = await GenresController.createGenre(value);
            return res.status(201).send(genre);
        } catch (e) {
            return next(e);
        }
    },
    getGenres: async (req, res, next) => {
        const { error, value } = Joi.object({
            limit: Joi.number().integer().default(10),
            skip: Joi.number().integer().default(0),
        }).validate(req.query);

        if (error) return next(error);

        try {
            const data = await GenresController.getGenres(value);
            return res.status(200).send(data);
        } catch (e) {
            return next(e);
        }
    },
});
