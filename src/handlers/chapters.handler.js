const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);

module.exports = ({ ChaptersController, CHAPTER_ERRORS, COMIC_ERRORS }) => ({
    createChapter: async (req, res, next) => {
        const { error, value } = Joi.object({
            comic_id: Joi.objectid().required(),
            title: Joi.string().required(),
            images_folder_url: Joi.string().uri().required(),
            description: Joi.string().optional(),
        }).validate(req.body);

        if (error) return next(error);

        try {
            const chapter = await ChaptersController.createChapter(value);
            return res.status(201).send(chapter);
        } catch (e) {
            e.status = e.message === COMIC_ERRORS.NOT_FOUND ? 404 : 500;
            return next(e);
        }
    },
    getOneChapter: async (req, res, next) => {
        const { error, value } = Joi.object({
            _id: Joi.objectid().required(),
        }).validate(req.params);

        if (error) return next(error);

        try {
            const data = await ChaptersController.getOneChapter(value);
            return res.status(200).send(data);
        } catch (e) {
            e.status = e.message === CHAPTER_ERRORS.NOT_FOUND ? 404 : 500;
            return next(e);
        }
    },
    // updateComic: async (req, res, next) => {
    //     const { error, value } = Joi.object({
    //         title: Joi.string(),
    //         description: Joi.string(),
    //         cover: Joi.string().uri(),
    //         _id: Joi.objectid().required(),
    //     }).validate({ ...req.body, ...req.params });

    //     if (error) return next(error);

    //     try {
    //         const data = await ComicsController.updateComic(value);
    //         return res.status(200).send(data);
    //     } catch (e) {
    //         e.status = e.message === COMIC_ERRORS.NOT_FOUND ? 404 : 500;
    //         return next(e);
    //     }
    // },
});
