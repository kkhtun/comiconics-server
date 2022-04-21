module.exports = ({ ComicsModel, COMIC_ERRORS }) => ({
    createComic: async (data) => {
        const comic = new ComicsModel(data);
        return await comic.save();
    },
    getComics: async ({ limit = 0, skip = 0 }) => {
        let query = {};
        const [data, count] = await Promise.all([
            ComicsModel.find(query).limit(limit).skip(skip),
            ComicsModel.find(query).countDocuments(),
        ]);
        return { data, count };
    },
    getOneComicByFilter: async (filter) => {
        const comic = await ComicsModel.findOne(filter).lean().exec();
        if (!comic) throw new Error(COMIC_ERRORS.NOT_FOUND);
        return comic;
    },
    updateComic: async ({ _id, ...data }) => {
        return await ComicsModel.findOneAndUpdate({ _id }, data, { new: true });
    },
});
