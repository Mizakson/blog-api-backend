// routes/signUp.js

const { Router } = require("express");
const controllers = require("../controllers");

const signUpRouter = Router();

signUpRouter.get("/", controllers.getsignUpMessage);

module.exports = signUpRouter;