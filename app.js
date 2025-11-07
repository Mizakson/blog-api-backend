// app.js
// main instance of app
// will be exported for testing purposes

require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const api = require("./routes");

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