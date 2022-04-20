const R = require("ramda");
const { expect } = require("@jest/globals");
const request = require("supertest"); // request(app) will automatically listen and connect to the server
const mongoose = require("mongoose");

// Test Dependencies
const UsersModel = require("../../../models/users.model");
const ComicsModel = require("../../../models/comics.model");
const app = require("../../../index");

// Test Helpers
const ComicsHelper = require("../helpers/comics.helper")({
    UsersModel,
    ComicsModel,
});
const UsersHelper = require("../helpers/users.helper")({ UsersModel });

// Test Deps
describe("Create Comics Service Test Suite", function () {
    // Global Vars
    // let app;
    beforeAll(async () => {});

    afterAll(async () => {
        await ComicsHelper.teardownDatabaseRecords();
        await mongoose.connection.close();
    });

    test("GET / - get comics with default limit and skip", async () => {
        // Setup
        let dummyUsers = R.range(0, 3).map((n) => {
            return UsersHelper.generateDummyUser();
        });
        let users = await UsersHelper.insertUsers(dummyUsers);
        let dummyComics = R.map(
            ({ _id }) =>
                ComicsHelper.generateDummyComicData({ creator_id: _id }),
            users
        );
        let comics = await ComicsHelper.insertComics(dummyComics);
        // Test
        const res = await request(app).get("/api/v1/comics").send();
        // Assert
        expect(res.status).toEqual(200);
        expect(res.body.count).toEqual(comics.length);
    });
});
