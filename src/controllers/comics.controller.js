module.exports = ({
    ComicsService,
    ChaptersService,
    GenresService,
    UsersService,
    LikesService,
    CommentsService,
}) => ({
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
    getOneComic: async ({ _id, user_id }) => {
        const comic = await ComicsService.getOneComicByFilter({ _id });
        const { data, count } = await ChaptersService.getChaptersByComicId({
            comic_id: comic._id,
        });
        comic.chapters = data;
        comic.chaptersCount = count;
        comic.likeCount = await LikesService.getTotalLikeCountByComicId(_id);

        if (user_id) {
            await UsersService.getOneUserByFilter({ _id: user_id });
            comic.liked = await LikesService.checkUserHasLikedComic({
                comic_id: comic._id,
                user_id,
            });
        }
        return comic;
    },
    updateComic: async ({ _id, ...data }) => {
        const comic = await ComicsService.getOneComicByFilter({ _id });
        return await ComicsService.updateComic({ _id, ...data });
    },
    // Like
    likeOrUnlikeComic: async ({ comic_id, user_id }) => {
        await ComicsService.getOneComicByFilter({
            _id: comic_id,
        });
        await UsersService.getOneUserByFilter({ _id: user_id });
        return await LikesService.likeOrUnlikeComic({ comic_id, user_id });
    },
    getTotalComicLikes: async ({ comic_id }) => {
        await ComicsService.getOneComicByFilter({
            _id: comic_id,
        });
        return await LikesService.getTotalLikeCountByComicId(comic_id);
    },
    // Comment
    createComment: async ({ comic_id, body, user_id }) => {
        await ComicsService.getOneComicByFilter({
            _id: comic_id,
        });
        await UsersService.getOneUserByFilter({ _id: user_id });
        return await CommentsService.createComment({ comic_id, user_id, body });
    },
    getCommentsByComicId: CommentsService.getCommentsByComicId,
});
