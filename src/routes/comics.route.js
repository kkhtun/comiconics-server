const express = require("express");

module.exports = ({ ComicsHandler }) => {
    const router = express.Router();

    router.post("/", ComicsHandler.createComic);

    router.get("/", ComicsHandler.getComics);

    router.get("/:_id", ComicsHandler.getOneComic);

    router.patch("/:_id", ComicsHandler.updateComic);

    // Likes
    router.patch("/:_id/likes", ComicsHandler.likeOrUnlikeComic);

    router.get("/:_id/likes", ComicsHandler.getComics);

    return router;
};
