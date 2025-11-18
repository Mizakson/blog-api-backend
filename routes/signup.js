// routes/signUp.js

const { Router } = require("express");
const controllers = require("../controllers");

const signUpRouter = Router();

signUpRouter.get("/", controllers.getSignUpMessage);
signUpRouter.post("/", controllers.validateUser, controllers.postSignUp);

module.exports = signUpRouter;