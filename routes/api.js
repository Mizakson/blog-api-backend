const { Router } = require("express");

const api = Router();

const sessionsRouter = require("./sessions");
const usersRouter = require("./users");

api.use("/session-status", sessionsRouter);
api.use("/users", usersRouter);

module.exports = api;