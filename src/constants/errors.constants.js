const USER_ERRORS = {
    NOT_FOUND: "User not found",
    VERIFIED_USER_EXISTS:
        "A verfied user with this email address already exists",
    ALREADY_EXISTS: "User already exists",
    TOO_MANY_REQUESTS:
        "Too many requests, please try again after a few seconds",
    INVALID_TOKEN: "Token is invalid, please try again",
    EXPIRED_TOKEN: "Token has expired, please request a new token",
    TOO_MANY_TRIES: "Too many tries, please request a new token",
    INVALID_CREDENTIALS: "Invalid credentials",
    NOT_AUTHORIZED: "Not authorized",
};

const COMIC_ERRORS = {
    NOT_FOUND: "Comic not found",
};

const CHAPTER_ERRORS = {
    NOT_FOUND: "Chapter not found",
};

module.exports = { USER_ERRORS, COMIC_ERRORS, CHAPTER_ERRORS };
