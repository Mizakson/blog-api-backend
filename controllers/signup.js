// controllers/signUp.js

// const prisma = require("../prisma/prisma");

async function getsignUpMessage(req, res) {
    res.status(200).json({ "message": "hi from signup router!" });
}

module.exports = { getsignUpMessage };