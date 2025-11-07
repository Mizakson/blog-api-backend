// routes/users.js

const { Router } = require("express");
const controllers = require("../controllers");
const postsRouter = require("./posts");

const usersRouter = Router();

usersRouter.get("/", controllers.getUserMessage);
usersRouter.get("/:userId", controllers.getUserInfo);

usersRouter.use("/:userId/posts", postsRouter);

module.exports = usersRouter;