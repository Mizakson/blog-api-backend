const { Router } = require("express");

const api = Router();

const sessionsRouter = require("./sessions");
const usersRouter = require("./users");
const signUpRouter = require("./signup");
const loginRouter = require("./login");
const logoutRouter = require("./logout");

api.use("/session-status", sessionsRouter);
api.use("/users", usersRouter);
api.use("/sign-up", signUpRouter);
api.use("/login", loginRouter);
api.use("/logout", logoutRouter);
api.get("/say-hello", (req, res) => {
    res.status(200).json({ "message": "hello from blog-api backend..." });
});

module.exports = api;