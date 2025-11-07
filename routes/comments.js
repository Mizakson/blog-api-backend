// routes/comments.js

const { Router } = require("express");
const controllers = require("../controllers");

const commentsRouter = Router({ mergeParams: true });

commentsRouter.get("/", controllers.getCommentMessage);
commentsRouter.get("/:commentId", controllers.getCommentInfo);

module.exports = commentsRouter;