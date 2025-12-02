// routes/posts.js

const { Router } = require("express");
const controllers = require("../controllers");
const commentsRouter = require("./comments");

const passport = require("passport");

const postsRouter = Router({ mergeParams: true });

postsRouter.get("/", passport.authenticate('jwt', { session: false }), controllers.getPostMessage);
postsRouter.get("/:postId", passport.authenticate('jwt', { session: false }), controllers.getPostInfo);

postsRouter.post("/create-post", passport.authenticate('jwt', { session: false }), controllers.postCreate);

postsRouter.use("/:postId/comments", commentsRouter);

module.exports = postsRouter;