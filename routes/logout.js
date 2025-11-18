// routes/logout.js

const { Router } = require("express");
const controllers = require("../controllers");
const passport = require("passport");

const logoutRouter = Router();

logoutRouter.get("/", passport.authenticate('jwt', { session: false }), controllers.getLogoutMessage);

module.exports = logoutRouter;