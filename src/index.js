require("dotenv").config();
const { ValidationError } = require("joi");
// Initialize express
const express = require("express");
const app = express();
// Initialize Loaders for DB, Dependency Injections etc.
const loaders = require("./loaders/index");
const { dbConnection, routes } = loaders.initialize();
// Import Middlewares Here eg. authMiddleware, will add later

// Register Middlewares and Routes (entry points for the application)
app.use(require("cors"));
app.use(express.json()); // Yay, bodyParser was bundled back to express after 4.16
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).send({ message: "Hello, Let's read comics!" });
});

app.use("/api/v1", routes);

// Error Handling
app.use((error, req, res, next) => {
    if (error instanceof ValidationError) {
        return res.status(422).send({
            code: 422,
            message: error.details[0].message || "UNPROCESSIBLE ENTITY",
        });
    }
    return res.status(error.status || 500).send({
        code: error.status || 500,
        message: error.message || "ERROR",
    });
});

app.use((req, res, next) =>
    res.status(404).send({
        code: 404, // if no routes match, response this
        message: "Resource Not Found",
    })
);
// Start the server listening and database connection
(async function main() {
    if (process.env.ENV !== "testing") {
        await dbConnection;
        const port = process.env.PORT || 3000;
        const logListening = (port) => () => {
            console.log("Server listening at port :", port);
        };
        app.listen(port, logListening(port));
    }
})();

module.exports = app;
