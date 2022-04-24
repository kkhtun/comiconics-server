const { USER_ERRORS } = require("../constants/errors.constants");
const jwt = require("jsonwebtoken");
const UsersModel = require("../models/users.model");

async function extractAuthInfo(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) {
        return next();
    }
    try {
        token = auth.split(" ")[1];
        if (!token) {
            throw new Error(USER_ERRORS.INVALID_TOKEN);
        }
        const { _id } = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UsersModel.findOne({ _id }).lean().exec();
        req.token = token;
        return next();
    } catch (e) {
        if (e.message === USER_ERRORS.INVALID_TOKEN) {
            e.status = 400;
        } else {
            e.status = 500;
        }
        return res.status(e.status).send({
            code: e.status,
            message: e.message,
        });
    }
}

function isAuthenticated(req, res, next) {
    if (req.user && req.token) {
        return next();
    }
    return res.status(401).send({
        code: 401,
        message: USER_ERRORS.NOT_AUTHORIZED,
    });
}

module.exports = { extractAuthInfo, isAuthenticated };
