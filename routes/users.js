// routes/users.js

const { Router } = require("express");
const controllers = require("../controllers");
const postsRouter = require("./posts");

const passport = require("passport");

const usersRouter = Router();

usersRouter.get("/", passport.authenticate('jwt', { session: false }), controllers.getUserMessage);
usersRouter.get("/:userId", passport.authenticate('jwt', { session: false }), controllers.getUserInfo);

usersRouter.use("/:userId/posts", postsRouter);

module.exports = usersRouter;