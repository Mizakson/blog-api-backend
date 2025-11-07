// routes/sessions.js

const { Router } = require("express");
// const controllers = require("../controllers");

const sessionsRouter = Router();

sessionsRouter.get("/", (req, res) => {
    res.status(200).json({ "message": "hi from sessions router!" });
});

module.exports = sessionsRouter;