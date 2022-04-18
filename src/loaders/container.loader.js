const awilix = require("awilix");

// This magic of automatic inversion of control using awilix happens here
function loadModels(container) {
    let mapping = {};
    Object.keys(mapping).forEach((key) => {
        let model = mapping[key];
        container.register({
            [key]: awilix.asValue(model),
        });
    });
}

function loadServices(container) {
    let mapping = {};
    Object.keys(mapping).forEach((key) => {
        let service = mapping[key];
        container.register({
            [key]: awilix.asFunction(service),
        });
    });
}

function loadControllers(container) {
    let mapping = {};
    Object.keys(mapping).forEach((key) => {
        let controller = mapping[key];
        container.register({
            [key]: awilix.asFunction(controller),
        });
    });
}

function loadHandlers(container) {
    let mapping = {};
    Object.keys(mapping).forEach((key) => {
        let handler = mapping[key];
        container.register({
            [key]: awilix.asFunction(handler),
        });
    });
}

function loadRoutes(container) {
    let mapping = {};
    Object.keys(mapping).forEach((key) => {
        let route = mapping[key];
        container.register({
            [key]: awilix.asFunction(route),
        });
    });
}

function loadConstants(container) {
    let mapping = {};
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
    layers.forEach((key) => layerMapping[key](container)); // Above functions are called here
    return container;
}

module.exports = initContainer;
