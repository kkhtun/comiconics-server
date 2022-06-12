const moment = require("moment");

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
        // Chapters
        const { data, count } = await ChaptersService.getChaptersByComicId({
            comic_id: comic._id,
        });
        comic.chapters = data;
        comic.chaptersCount = count;
        // Likes
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
        const response = await LikesService.likeOrUnlikeComic({
            comic_id,
            user_id,
        });

        // Get total likes for the comic and cache it in the comic document
        // We will only display that cached value in most cases
        const likeCount = await LikesService.getTotalLikeCountByComicId(
            comic_id
        );
        await ComicsService.updateComic(
            {
                _id: comic_id,
                likeCount,
            },
            { new: false }
        );

        return { ...response, likeCount };
    },
    getTotalComicLikes: async ({ comic_id }) => {
        const comic = await ComicsService.getOneComicDocumentById(comic_id);
        return comic.likeCount;
    },
    // Comment
    createComment: async ({ comic_id, body, user_id }) => {
        await ComicsService.getOneComicByFilter({
            _id: comic_id,
        });
        await UsersService.getOneUserByFilter({ _id: user_id });
        return await CommentsService.createComment({ comic_id, user_id, body });
    },
    getCommentsByComicId: async (query) => {
        await ComicsService.getOneComicByFilter({
            _id: query.comic_id,
        });
        return await CommentsService.getCommentsByComicId(query);
    },
});
