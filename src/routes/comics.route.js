const express = require("express");

module.exports = ({ ComicsHandler }) => {
    const router = express.Router();

    router.post("/", ComicsHandler.createComic);

    return router;
};
