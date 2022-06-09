module.exports = ({ GenresModel }) => ({
    getGenres: async ({ limit = 10, skip = 0 }) => {
        let query = {};
        const [data, count] = await Promise.all([
            GenresModel.find(query).limit(limit).skip(skip),
            GenresModel.find(query).countDocuments(),
        ]);
        return { data, count };
    },
    createGenre: async (data) => {
        const genre = new GenresModel(data);
        return await genre.save();
    },
    getOneGenreById: async (_id) => {
        return await GenresModel.findById(_id).lean().exec();
    },
});
