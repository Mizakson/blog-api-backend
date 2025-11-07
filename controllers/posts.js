// controllers/posts.js

// const prisma = require("../prisma/prisma");

async function getPostMessage(req, res) {
    res.status(200).json({ "message": "hi from posts router!" });
}

async function getPostInfo(req, res) {
    res.status(200).json({
        "message": "post info retrieved!",
        "post-id": req.params.postId
    });
}

module.exports = { getPostMessage, getPostInfo };