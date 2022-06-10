module.exports = ({ LikesModel }) => ({
    getTotalLikeCountByComicId: async (comic_id) => {
        return await LikesModel.find({ comic_id }).countDocuments();
    },
    likeOrUnlikeComic: async ({ comic_id, user_id }) => {
        const liked = await LikesModel.findOne({ comic_id, user_id }).exec();
        if (liked) {
            await LikesModel.deleteOne({ _id: liked._id }).exec();
            return { liked: false };
        } else {
            const document = new LikesModel({ comic_id, user_id });
            await document.save();
            return { liked: true };
        }
    },
});
