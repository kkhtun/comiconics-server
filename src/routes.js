const router = require("express").Router();

module.exports = (container) => {
    // Routes Here
    router.use("/comics", container.cradle.ComicsRouter);

    router.use("/users", container.cradle.UsersRouter);

    return router;
};
