// routes/login.js

const { Router } = require("express");
const controllers = require("../controllers");

const loginRouter = Router();

loginRouter.get("/", controllers.getLoginMessage);

module.exports = loginRouter;