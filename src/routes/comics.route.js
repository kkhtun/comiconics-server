const express = require("express");

module.exports = ({ ComicsHandler }) => {
    const router = express.Router();

    router.post("/", ComicsHandler.createComic);

    router.get("/", ComicsHandler.getComics);

    router.get("/:_id", ComicsHandler.getOneComic);

    router.patch("/:_id", ComicsHandler.updateComic);

    return router;
};
