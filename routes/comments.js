// routes/comments.js

const { Router } = require("express");
const controllers = require("../controllers");

const commentsRouter = Router({ mergeParams: true });

commentsRouter.get("/", controllers.getCommentMessage);
commentsRouter.get("/:commentId", controllers.getCommentInfo);

commentsRouter.post("/create-comment", passport.authenticate('jwt', { session: false }), controllers.commentCreate);

commentsRouter.put("/:commentId/update-comment", passport.authenticate('jwt', { session: false }), controllers.updateComment);
commentsRouter.delete("/:commentId/delete-comment", passport.authenticate('jwt', { session: false }), controllers.deleteComment);

module.exports = commentsRouter;