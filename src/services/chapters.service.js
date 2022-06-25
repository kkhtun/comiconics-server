const moment = require("moment");
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

        const current = moment().utc();
        const diff = Math.abs(
            moment(chapter.updatedAt).utc().diff(current, "minutes")
        );
        if (diff > 3 || !chapter.pages || chapter.pages.length === 0 || true) {
            const pageUrls = await S3Service.listImageUrls({
                imagesFolderUrl: chapter.images_folder_url,
            });
            // cache pages in chapter document at 3 minute intervals
            return await ChaptersModel.findOneAndUpdate(
                { _id },
                { pages: pageUrls },
                { new: true }
            ).populate("comic_id", "title");
        }
        return chapter;
    },
});
