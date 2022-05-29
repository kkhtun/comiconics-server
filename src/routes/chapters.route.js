const express = require("express");

module.exports = ({ ChaptersHandler }) => {
    const router = express.Router();

    router.post("/", ChaptersHandler.createChapter);

    router.get("/:_id", ChaptersHandler.getOneChapter);

    return router;
};
