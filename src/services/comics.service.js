module.exports = ({ ComicsModel }) => ({
    createComic: async (data) => {
        const comic = new ComicsModel(data);
        return await comic.save();
    },
    getComics: async ({ limit = 0, skip = 0 }) => {
        let query = {};
        const [data, count] = Promise.all([
            await ComicsModel.find(query).limit(limit).skip(skip).exec(),
            await ComicsModel.countDocuments(query),
        ]);
        return { data, count };
    },
});
