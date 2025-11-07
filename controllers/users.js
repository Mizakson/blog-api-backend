// controllers/users.js

// const prisma = require("../prisma/prisma");

async function getUserMessage(req, res) {
    res.status(200).json({ "message": "hi from users router!" });
}

async function getUserInfo(req, res) {
    res.status(200).json({
        "message": "user info retrieved!",
        "user-id": req.params.userId
    });
}

module.exports = { getUserMessage, getUserInfo };