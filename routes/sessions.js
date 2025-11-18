// routes/sessions.js

const { Router } = require("express");
const controllers = require("../controllers");
const passport = require("passport");

const sessionsRouter = Router();

sessionsRouter.get("/", passport.authenticate('jwt', { session: false }), controllers.getSessionStatus);

module.exports = sessionsRouter;