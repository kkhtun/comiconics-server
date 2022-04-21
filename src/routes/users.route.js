const express = require("express");

module.exports = ({ UsersHandler }) => {
    const router = express.Router();

    router.post("/verify-email", UsersHandler.sendRegistryEmail);

    return router;
};
