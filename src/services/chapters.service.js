module.exports = ({ ChaptersModel, CHAPTER_ERRORS, S3Service }) => ({
    getChaptersByComicId: async ({
        comic_id,
        limit = 0,
        skip = 0,
        projection = {},
    }) => {
        let query = {
            comic_id,
        };
        const [data, count] = await Promise.all([
            ChaptersModel.find(query, projection).limit(limit).skip(skip),
            ChaptersModel.find(query).countDocuments(),
        ]);
        return { data, count };
    },
    createChapter: async ({ comic_id, title, images_folder_url }) => {
        const chapter = new ChaptersModel({
            comic_id,
            title,
            images_folder_url,
        });
        return await chapter.save();
    },
    getOneChapter: async ({ _id }) => {
        const chapter = await ChaptersModel.findById(_id)
            .populate("comic_id", "title")
            .lean()
            .exec();
        if (!chapter) throw new Error(CHAPTER_ERRORS.NOT_FOUND);

        const awsResponse = await S3Service.listImageUrls({
            imagesFolderUrl: chapter.images_folder_url,
        });

        return { ...chapter, pages: awsResponse };
    },
});
