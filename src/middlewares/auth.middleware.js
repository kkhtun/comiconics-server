const { USER_ERRORS } = require("../constants/errors.constants");
const UsersModel = require("../models/users.model");
const FirebaseService = require("../services/firebase.service")({});

const makeErrorResponse =
    (res) =>
    ({ status = 401, message = "Unauthorized" }) => {
        return res.status(status).send({
            code: status,
            message: message,
        });
    };

async function extractAuthInfo(req, res, next) {
    let respondError = makeErrorResponse(res);

    let authorization = req.headers.authorization;
    if (authorization) {
        let bearerToken = authorization.split(" ");
        if (bearerToken.length != 2 || bearerToken[0] != "Bearer")
            return respondError({ status: 401, message: "Invalid Token" });

        let token = bearerToken[1];
        try {
            const result = await FirebaseService.verifyToken(token);
            const dbUser = await UsersModel.findOne({
                firebase_id: result.uid,
                email: result.email,
            }).exec();
            // sync here
            if (!dbUser || dbUser == null) {
                const newDbUser = new UsersModel({
                    firebase_id: result.uid,
                    email: result.email,
                    name: result.name,
                });
                req.user = await newDbUser.save();
            } else {
                dbUser.name = result.name;
                req.user = await dbUser.save();
            }
            req.token = token;
            return next();
        } catch (e) {
            return respondError({ status: 401, message: "Token Expired" });
        }
    } else {
        return next();
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

function isAdmin(req, res, next) {
    if (req.user && req.user.user_type === "ADMIN") {
        return next();
    }
    return res.status(401).send({
        code: 401,
        message: USER_ERRORS.NOT_AUTHORIZED,
    });
}

module.exports = { extractAuthInfo, isAuthenticated, isAdmin };
