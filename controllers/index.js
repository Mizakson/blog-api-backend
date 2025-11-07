// controllers/index.js

const sessionsController = require("./sessions");
const usersController = require("./users");
const postsController = require("./posts");
const commentsController = require("./comments");

module.exports = {
    ...sessionsController,
    ...usersController,
    ...postsController,
    ...commentsController,
};