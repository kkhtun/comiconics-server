const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.middleware");

module.exports = ({ ComicsHandler }) => {
    const router = express.Router();

    router.post("/", ComicsHandler.createComic);

    router.get("/", ComicsHandler.getComics);

    router.get("/:_id", ComicsHandler.getOneComic);

    router.patch("/:_id", ComicsHandler.updateComic);

    // Likes
    router.patch("/:_id/likes", ComicsHandler.likeOrUnlikeComic);

    router.get("/:_id/likes", ComicsHandler.getTotalComicLikes);

    // Comments
    router.post("/:_id/comments", ComicsHandler.createComment);

    router.get("/:_id/comments", ComicsHandler.getCommentsByComicId);

    return router;
};
