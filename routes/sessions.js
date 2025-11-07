// routes/sessions.js

const { Router } = require("express");
const controllers = require("../controllers");

const sessionsRouter = Router();

sessionsRouter.get("/", controllers.getSessionStatus);

module.exports = sessionsRouter;