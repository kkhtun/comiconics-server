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
describe("Update Comics Service Test Suite", function () {
    // Global Vars
    // let app;
    beforeAll(async () => {});

    afterAll(async () => {
        await ComicsHelper.teardownDatabaseRecords();
        await mongoose.connection.close();
    });

    test("PATCH / - update one comic correctly", async () => {
        // Setup
        const user = await UsersHelper.insertDummyUser({});
        const comic = await ComicsHelper.insertDummyComic({
            creator_id: user._id,
        });

        const update = await ComicsHelper.generateDummyComicData({
            creator_id: user._id,
        });
        // Test
        const res = await request(app)
            .patch(`/api/v1/comics/${comic._id}`)
            .send(R.omit(["creator"], update));
        // Assert
        const pickMatchers = R.pick(["title", "description", "cover"]);
        expect(res.status).toEqual(200);
        expect(pickMatchers(res.body)).toMatchObject(pickMatchers(update));
    });

    test("PATCH / - update one comic that does not exist", async () => {
        // Setup
        const _id = new mongoose.Types.ObjectId();

        const update = await ComicsHelper.generateDummyComicData({
            creator_id: new mongoose.Types.ObjectId(),
        });
        // Test
        const res = await request(app)
            .patch(`/api/v1/comics/${_id}`)
            .send(R.omit(["creator"], update));
        // Assert
        expect(res.status).toEqual(404);
    });
});
