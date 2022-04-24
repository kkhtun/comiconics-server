const express = require("express");

module.exports = ({ UsersHandler }) => {
    const router = express.Router();

    // Call these routes in order for registration
    router.post("/create-template-user", UsersHandler.createTemplateUser);

    router.post("/send-verify-email", UsersHandler.sendVerifyEmail);

    router.post("/verify-email", UsersHandler.verifyEmailWithToken);

    // Login will send back jwt token
    router.post("/login", UsersHandler.login);

    return router;
};
