// controllers/login.js

// const prisma = require("../prisma/prisma");

async function getLoginMessage(req, res) {
    res.status(200).json({ "message": "hi from login router!" });
}

module.exports = { getLoginMessage };