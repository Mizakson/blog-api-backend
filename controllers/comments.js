// controllers/comments.js

// const prisma = require("../prisma/prisma");

async function getCommentMessage(req, res) {
    res.status(200).json({ "message": "hi from comments router!" });
}

async function commentCreate(req, res, next) {
    const { text } = req.body;
    const userId = req.user.id;

    if (!text || !userId) {
        return res.status(400).json({ message: "Missing required comment field (text) or user ID." });
    }

    try {
        const newComment = await prisma.comment.create({
            data: {
                text: text,
                userId: userId,
            },
        });

        res.status(201).json({
            "message": "comment created successfully",
            "data": newComment,
        });

    } catch (err) {
        console.error("comment creation error: ", err);
        next(err);
    }

}

async function getCommentInfo(req, res) {
    const { commentId } = req.params;
    const userId = req.user.id;

    try {
        const commentInfo = await prisma.comment.findUnique({
            where: {
                id: commentId,
            }
        });

        res.status(200).json({
            "message": "comment info retrieved successfully",
            "data": commentInfo,
        });

    } catch (err) {
        console.error("comment info error: ", err);
        next(err);
    }
}

async function updateComment(req, res, next) {
    const { text } = req.body;
    const { commentId } = req.params;
    const userId = req.user.id;

    try {
        const updatedCommentInfo = await prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                text: text,
                postedAt: new Date()
            }
        });

        res.status(200).json({
            "message": "comment info updated successfully",
            "data": updatedCommentInfo,
        });

    } catch (err) {
        console.error("comment update error: ", err);
        next(err);
    }
}

async function deleteComment(req, res, next) {
    const { commentId } = req.params;
    const userId = req.user.id;

    try {
        const deleteComment = await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });

        res.status(204).json({
            "message": `post with id ${commentId} deleted successfully`,
        });

    } catch (err) {
        console.error("comment delete error: ", err);
        next(err);
    }

}

module.exports = { getCommentMessage, commentCreate, getCommentInfo, updateComment, deleteComment };