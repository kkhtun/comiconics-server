module.exports = ({ ComicsModel }) => ({
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
});
