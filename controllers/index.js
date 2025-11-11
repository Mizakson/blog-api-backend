// controllers/index.js

const sessionsController = require("./sessions");
const usersController = require("./users");
const postsController = require("./posts");
const commentsController = require("./comments");
const signUpController = require("./signup");
const loginController = require("./login");

module.exports = {
    ...sessionsController,
    ...usersController,
    ...postsController,
    ...commentsController,
    ...signUpController,
    ...loginController,
};