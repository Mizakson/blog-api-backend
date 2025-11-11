// controllers/signUp.js

// const prisma = require("../prisma/prisma");

async function getSignUpMessage(req, res) {
    res.status(200).json({ "message": "hi from signup router!" });
}

module.exports = { getSignUpMessage };