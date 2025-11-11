// app.js
// main instance of app
// will be exported for testing purposes

require("dotenv").config();
const express = require("express");
const passport = require("passport");
const path = require("node:path");
// const cors = require("cors");

const { rateLimit } = require("express-rate-limit");

const configurePassport = require("./config/passport");

const app = express();

// const allowedOrigin = process.env.REACT_FRONTEND_URL

// app.use(cors({
//     origin: allowedOrigin,
//     optionsSuccessStatus: 200
// }))

app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const api = require("./routes");

app.use(express.static("public"));

app.use(passport.initialize());

configurePassport();

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    limit: 100, // 100 requests per min 
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: "request limit reached",
});

app.use(limiter);

// don't know if needed for jwt or not
// app.use((req, res, next) => {
//     res.locals.currentUser = req.user
//     next()
// })

app.use("/api", api);

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.staus || 'An unexpected error has occured.';

    res.status(statusCode).json({
        message: message,
    });

});

module.exports = app;