module.exports = ({ ComicsService, ChaptersService, GenresService }) => ({
    createComic: async (data) => {
        if (data.genres) {
            data.genres.forEach(async (genre) => {
                await GenresService.getOneGenreById(genre);
            });
        }
        return await ComicsService.createComic(data);
    },
    getComics: async (query) => {
        if (query.genres) {
            query.genres = query.genres.split(",");
        }
        return await ComicsService.getComics(query);
    },
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
