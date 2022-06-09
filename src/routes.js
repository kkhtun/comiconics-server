const router = require("express").Router();

module.exports = (container) => {
    // Routes Here
    router.use("/comics", container.cradle.ComicsRouter);

    router.use("/chapters", container.cradle.ChaptersRouter);

    router.use("/users", container.cradle.UsersRouter);

    router.use("/genres", container.cradle.GenresRouter);

    return router;
};
