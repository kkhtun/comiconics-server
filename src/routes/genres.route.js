const express = require("express");

module.exports = ({ GenresHandler }) => {
    const router = express.Router();

    router.post("/", GenresHandler.createGenre);

    router.get("/", GenresHandler.getGenres);

    return router;
};
