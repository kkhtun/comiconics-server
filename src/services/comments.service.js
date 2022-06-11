module.exports = ({ CommentsModel }) => ({
    getCommentsByComicId: async ({
        comic_id,
        limit = 10,
        skip = 0,
        projection = {},
    }) => {
        let query = {
            comic_id,
        };
        const [data, count] = await Promise.all([
            CommentsModel.find(query, projection).limit(limit).skip(skip),
            CommentsModel.find(query).countDocuments(),
        ]);
        return { data, count };
    },
    createComment: async (data) => {
        const comment = new CommentsModel(data);
        return await comment.save();
    },
});
