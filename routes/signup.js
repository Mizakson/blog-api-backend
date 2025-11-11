// routes/signUp.js

const { Router } = require("express");
const controllers = require("../controllers");

const signUpRouter = Router();

signUpRouter.get("/", controllers.getSignUpMessage);

module.exports = signUpRouter;