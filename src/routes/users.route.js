const express = require("express");

module.exports = ({ UsersHandler }) => {
    const router = express.Router();

    router.post("/create-template-user", UsersHandler.createTemplateUser);

    router.post("/send-verify-email", UsersHandler.sendVerifyEmail);

    router.post("/verify-email", UsersHandler.verifyEmailWithToken);

    return router;
};
