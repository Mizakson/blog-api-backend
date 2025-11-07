// controllers/sessions.js

// const prisma = require("../prisma/prisma");

async function getSessionStatus(req, res) {
    res.status(200).json({ "message": "hi from sessions router!" });
}

module.exports = { getSessionStatus };