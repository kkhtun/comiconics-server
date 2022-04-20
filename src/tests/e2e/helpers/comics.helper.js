const moment = require("moment");
const { faker } = require("@faker-js/faker");

const ComicsHelper = ({ ComicsModel, UsersModel }) => ({
    generateDummyComicData: ({ creator_id }) => {
        return {
            title: faker.name.findName(),
            description: faker.lorem.paragraph(),
            cover: faker.image.image(),
            creator: creator_id.toString(),
        };
    },
    insertDummyComic: async ({ creator_id }) => {
        const newUser = new ComicsModel({
            title: faker.name.findName(),
            description: faker.lorem.paragraph(),
            cover: faker.image.image(),
            creator: creator_id,
        });
        return await newUser.save();
    },
    insertComics: async (data) => {
        return await ComicsModel.insertMany(data);
    },
    teardownDatabaseRecords: async () => {
        await ComicsModel.deleteMany({});
        await UsersModel.deleteMany({});
    },
});

module.exports = ComicsHelper;
