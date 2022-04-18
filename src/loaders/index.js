const initContainer = require("./container.loader");
const connectToDb = require("./db.loader");
const injectContainerToMainRouter = require("../routes");

function initialize() {
    const container = initContainer([
        "models",
        "services",
        "controllers",
        "handlers",
        "routes",
        "constants",
        "helpers",
    ]);

    const routes = injectContainerToMainRouter(container);

    const dbConnection = connectToDb(
        process.env.ENV !== "testing"
            ? process.env.MONGO_URL
            : process.env.MONGO_URL_TESTING
    );
    return { dbConnection, routes };
}

module.exports = { initialize };
