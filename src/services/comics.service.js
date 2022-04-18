module.exports = ({ ComicsModel }) => ({
    createComic: async (data) => {
        const comic = new ComicsModel(data);
        return await comic.save();
    },
});
