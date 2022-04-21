module.exports = ({ ComicsService, UsersService }) => ({
    createComic: async (data) => {
        await UsersService.getOneUserByFilter({
            _id: data.creator,
            user_type: "CREATOR",
        });
        return await ComicsService.createComic(data);
    },
    getComics: ComicsService.getComics,
    getOneComic: async ({ _id }) => {
        return await ComicsService.getOneComicByFilter({ _id });
    },
    updateComic: async ({ _id, ...data }) => {
        const comic = await ComicsService.getOneComicByFilter({ _id });
        return await ComicsService.updateComic({ _id, ...data });
    },
});
