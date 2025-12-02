// routes/posts.js

const { Router } = require("express");
const controllers = require("../controllers");
const commentsRouter = require("./comments");

const passport = require("passport");

const postsRouter = Router({ mergeParams: true });

postsRouter.get("/", passport.authenticate('jwt', { session: false }), controllers.getPostMessage);
postsRouter.get("/:postId", passport.authenticate('jwt', { session: false }), controllers.getPostInfo);

postsRouter.post("/create-post", passport.authenticate('jwt', { session: false }), controllers.postCreate);

postsRouter.put("/:postId/update-post", passport.authenticate('jwt', { session: false }), controllers.updatePost);
postsRouter.delete("/:postId/delete-post", passport.authenticate('jwt', { session: false }), controllers.deletePost);

postsRouter.use("/:postId/comments", commentsRouter);

module.exports = postsRouter;