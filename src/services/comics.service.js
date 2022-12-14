module.exports = ({ ComicsModel, COMIC_ERRORS }) => ({
    createComic: async (data) => {
        const comic = new ComicsModel(data);
        return await comic.save();
    },
    getComics: async ({ limit = 10, skip = 0, genres = [], search }) => {
        let query = {};

        if (genres && genres.length) {
            query.genres = {
                $in: genres,
            };
        }

        if (search) {
            query.title = {
                $regex: search,
                $options: "ig",
            };
        }

        const [data, count] = await Promise.all([
            ComicsModel.find(query)
                .populate("genres", "name")
                .sort("-createdAt")
                .limit(limit)
                .skip(skip),
            ComicsModel.find(query).countDocuments(),
        ]);
        return { data, count };
    },
    getOneComicByFilter: async (filter) => {
        const comic = await ComicsModel.findOne(filter)
            .populate("genres", "name")
            .lean()
            .exec();
        if (!comic) throw new Error(COMIC_ERRORS.NOT_FOUND);
        return comic;
    },
    getOneComicDocumentById: async (_id) => {
        // Unlike getOneComic func above, this will only fetch via ID and will be lightweight, no populate
        const comic = await ComicsModel.findById(_id).lean().exec();
        if (!comic) throw new Error(COMIC_ERRORS.NOT_FOUND);
        return comic;
    },
    updateComic: async ({ _id, ...data }, options = { new: true }) => {
        return await ComicsModel.findOneAndUpdate({ _id }, data, options);
    },
});
