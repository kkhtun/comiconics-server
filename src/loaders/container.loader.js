const awilix = require("awilix");

// This magic of automatic inversion of control using awilix happens here
function loadModels(container) {
    let mapping = {
        ComicsModel: require("../models/comics.model"),
        UsersModel: require("../models/users.model"),
        ChaptersModel: require("../models/chapters.model"),
        GenresModel: require("../models/genres.model"),
        LikesModel: require("../models/likes.model"),
        CommentsModel: require("../models/comments.model"),
    };
    Object.keys(mapping).forEach((key) => {
        let model = mapping[key];
        container.register({
            [key]: awilix.asValue(model),
        });
    });
}

function loadServices(container) {
    let mapping = {
        ComicsService: require("../services/comics.service"),
        UsersService: require("../services/users.service"),
        EmailService: require("../services/email.service"),
        ChaptersService: require("../services/chapters.service"),
        GenresService: require("../services/genres.service"),
        LikesService: require("../services/likes.service"),
        CommentsService: require("../services/comments.service"),
        S3Service: require("../services/s3.service"),
        FirebaseService: require("../services/firebase.service"),
    };
    Object.keys(mapping).forEach((key) => {
        let service = mapping[key];
        container.register({
            [key]: awilix.asFunction(service),
        });
    });
}

function loadControllers(container) {
    let mapping = {
        ComicsController: require("../controllers/comics.controller"),
        UsersController: require("../controllers/users.controller"),
        ChaptersController: require("../controllers/chapters.controller"),
        GenresController: require("../controllers/genres.controller"),
    };
    Object.keys(mapping).forEach((key) => {
        let controller = mapping[key];
        container.register({
            [key]: awilix.asFunction(controller),
        });
    });
}

function loadHandlers(container) {
    let mapping = {
        ComicsHandler: require("../handlers/comics.handler"),
        UsersHandler: require("../handlers/users.handler"),
        ChaptersHandler: require("../handlers/chapters.handler"),
        GenresHandler: require("../handlers/genres.handler"),
    };
    Object.keys(mapping).forEach((key) => {
        let handler = mapping[key];
        container.register({
            [key]: awilix.asFunction(handler),
        });
    });
}

function loadRoutes(container) {
    let mapping = {
        ComicsRouter: require("../routes/comics.route"),
        UsersRouter: require("../routes/users.route"),
        ChaptersRouter: require("../routes/chapters.route"),
        GenresRouter: require("../routes/genres.route"),
    };
    Object.keys(mapping).forEach((key) => {
        let route = mapping[key];
        container.register({
            [key]: awilix.asFunction(route),
        });
    });
}

function loadConstants(container) {
    let mapping = {
        ...require("../constants/errors.constants"),
        ...require("../constants/email.constants"),
    };
    Object.keys(mapping).forEach((key) => {
        let constant = mapping[key];
        container.register({
            [key]: awilix.asValue(constant),
        });
    });
}

function loadHelpers(container) {
    let mapping = {};
    Object.keys(mapping).forEach((key) => {
        let helper = mapping[key];
        container.register({
            [key]: awilix.asFunction(helper),
        });
    });
}

function initContainer(layers = []) {
    const container = awilix.createContainer();
    const layerMapping = {
        models: loadModels,
        services: loadServices,
        controllers: loadControllers,
        handlers: loadHandlers,
        routes: loadRoutes,
        constants: loadConstants,
        helpers: loadHelpers,
    };

    layers = layers.filter((l) => Object.keys(layerMapping).includes(l));
    layers.forEach((key) => layerMapping[key](container)); // Above functions are called here, and layers are injected
    return container;
}

module.exports = initContainer;
