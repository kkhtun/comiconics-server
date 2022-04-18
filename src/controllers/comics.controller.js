module.exports = ({ ComicsService, UsersService }) => ({
    createComic: async (data) => {
        const user = await UsersService.getOneUserByFilter({
            _id: data.creator,
        });
        return await ComicsService.createComic(data);
    },
});
