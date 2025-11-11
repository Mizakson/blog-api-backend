// controllers/index.js

const sessionsController = require("./sessions");
const usersController = require("./users");
const postsController = require("./posts");
const commentsController = require("./comments");
const signUpRouter = require("../routes/signup");
const loginRouter = require("../routes/login");

module.exports = {
    ...sessionsController,
    ...usersController,
    ...postsController,
    ...commentsController,
    ...signUpRouter,
    // loginRouter,
};