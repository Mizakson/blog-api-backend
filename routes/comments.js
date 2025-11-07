// routes/comments.js

const { Router } = require("express");
// const controllers = require("../controllers");

const commentsRouter = Router({ mergeParams: true });

commentsRouter.get("/", (req, res) => {
    res.status(200).json({ "message": "hi from comments router!" });
});

module.exports = commentsRouter;