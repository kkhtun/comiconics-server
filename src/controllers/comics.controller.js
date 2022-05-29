module.exports = ({ ComicsService, ChaptersService, UsersService }) => ({
    createComic: async (data) => {
        return await ComicsService.createComic(data);
    },
    getComics: ComicsService.getComics,
    getOneComic: async ({ _id }) => {
        const comic = await ComicsService.getOneComicByFilter({ _id });
        const { data, count } = await ChaptersService.getChaptersByComicId({
            comic_id: comic._id,
        });
        comic.episodes = data;
        comic.episodes_count = count;
        return comic;
    },
    updateComic: async ({ _id, ...data }) => {
        const comic = await ComicsService.getOneComicByFilter({ _id });
        return await ComicsService.updateComic({ _id, ...data });
    },
});
