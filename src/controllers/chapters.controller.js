module.exports = ({ ComicsService, ChaptersService }) => ({
    createChapter: async ({ comic_id, ...data }) => {
        const comic = await ComicsService.getOneComicByFilter({
            _id: comic_id,
        });
        return await ChaptersService.createChapter({
            comic_id,
            ...data,
        });
    },
    getOneChapter: ChaptersService.getOneChapter,
});
