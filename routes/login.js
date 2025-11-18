// routes/login.js

const { Router } = require("express");
const controllers = require("../controllers");

const loginRouter = Router();

loginRouter.get("/", controllers.getLoginMessage);
loginRouter.post("/", controllers.postLogin);

module.exports = loginRouter;