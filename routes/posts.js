// routes/posts.js

const { Router } = require("express");
const controllers = require("../controllers");
const commentsRouter = require("./comments");

const postsRouter = Router({ mergeParams: true });

postsRouter.get("/", controllers.getPostMessage);
postsRouter.get("/:postId", controllers.getPostInfo);

postsRouter.use("/:postId/comments", commentsRouter);

module.exports = postsRouter;