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
    teardownDatabaseRecords: async () => {
        await UsersModel.deleteMany({});
    },
});

module.exports = UsersHelper;
