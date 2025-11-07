// routes/posts.js

const { Router } = require("express");
// const controllers = require("../controllers");
const commentsRouter = require("./comments");

const postsRouter = Router({ mergeParams: true });

postsRouter.get("/", (req, res) => {
    res.status(200).json({ "message": "hi from posts router!" });
});

postsRouter.get("/:postId", (req, res) => {
    res.status(200).json({
        "message": "post id retrieved!",
        "post-id": req.params.postId
    });
});

postsRouter.use("/:postId/comments", commentsRouter);

module.exports = postsRouter;