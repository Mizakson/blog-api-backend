// routes/users.js

const { Router } = require("express");
// const controllers = require("../controllers");
const postsRouter = require("./posts");

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
    res.status(200).json({ "message": "hi from users router!" });
});

usersRouter.get("/:userId", (req, res) => {
    res.status(200).json({
        "message": "user id retrieved!",
        "post-id": req.params.userId
    });
});

usersRouter.use("/:userId/posts", postsRouter);

module.exports = usersRouter;