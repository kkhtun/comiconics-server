module.exports = ({ ComicsService, UsersService }) => ({
    createComic: async (data) => {
        await UsersService.getOneUserByFilter({
            _id: data.creator,
            user_type: "CREATOR",
        });
        return await ComicsService.createComic(data);
    },
    getComics: ComicsService.getComics,
});
