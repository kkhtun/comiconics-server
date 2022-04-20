const moment = require("moment");
const { faker } = require("@faker-js/faker");

const UsersHelper = ({ UsersModel }) => ({
    insertDummyUser: async ({ user_type = "CREATOR" }) => {
        const newUser = new UsersModel({
            email: faker.internet.email(),
            name: faker.name.findName(),
            user_type,
        });
        return await newUser.save();
    },
    insertUsers: async (data) => {
        return await UsersModel.insertMany(data);
    },
    generateDummyUser: () => {
        return {
            email: faker.internet.email(),
            name: faker.name.findName(),
            user_type: faker.random.arrayElement(["CREATOR"]),
        };
    },
    teardownDatabaseRecords: async () => {
        await UsersModel.deleteMany({});
    },
});

module.exports = UsersHelper;
