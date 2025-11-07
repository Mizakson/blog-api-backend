// controllers/comments.js

// const prisma = require("../prisma/prisma");

async function getCommentMessage(req, res) {
    res.status(200).json({ "message": "hi from comments router!" });
}

async function getCommentInfo(req, res) {
    res.status(200).json({
        "message": "comment info retrieved!",
        "comment-id": req.params.commentId
    });
}

module.exports = { getCommentMessage, getCommentInfo };