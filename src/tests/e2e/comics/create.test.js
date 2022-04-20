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

    test("GET /", async function () {
        // Test
        const res = await request(app).get("/").send();
        // Assert
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject({
            message: "Hello, Let's read comics!",
        });
    });

    test("POST /comics - should create new comic correctly", async function () {
        // Setup
        let creator = await UsersHelper.insertDummyUser({});
        let data = ComicsHelper.generateDummyComicData({
            creator_id: creator._id,
        });
        // Test
        const res = await request(app).post("/api/v1/comics").send(data);
        // Assert
        expect(res.status).toEqual(201);
        expect(res.body).toMatchObject(data);
    });

    test("POST /comics - should not create comic from non-creator", async function () {
        // Setup
        let reader = await UsersHelper.insertDummyUser({
            user_type: "READER",
        });
        let data = ComicsHelper.generateDummyComicData({
            creator_id: reader._id,
        });
        // Test
        const res = await request(app).post("/api/v1/comics").send(data);
        // Assert
        expect(res.status).toEqual(404);
    });
});
