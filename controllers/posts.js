// controllers/posts.js

const prisma = require("../prisma/prisma");

async function getPostMessage(req, res) {
    res.status(200).json({ "message": "hi from posts router!" });
}

// *********************************************
// for /create-post route
async function postCreate(req, res, next) {
    const { title, text, state } = req.body;
    const userId = req.user.id;

    if (!text || !title || !userId) {
        return res.status(400).json({ message: "Missing required post fields (text, title) or user ID." });
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                title: title,
                text: text,
                state: state || 'UNPUBLISHED',
                userId: userId,
            },
        });

        res.status(201).json({
            "message": "post created successfully",
            "data": newPost,
        });

    } catch (err) {
        console.error("Post creation error: ", err);
        next(err);
    }

}

async function getPostInfo(req, res, next) {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        const postInfo = await prisma.post.findUnique({
            where: {
                id: postId,
            }
        });

        res.status(200).json({
            "message": "post info retrieved successfully",
            "data": postInfo,
        });

    } catch (err) {
        console.error("Post creation error: ", err);
        next(err);
    }
}

async function updatePost(req, res, next) {
    const { title, text, state } = req.body;
    const { postId } = req.params;
    const userId = req.user.id;


    try {
        const updatedPostInfo = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                title: title,
                text: text,
                state: state
            }
        });

        res.status(200).json({
            "message": "post info updated successfully",
            "data": updatedPostInfo,
        });

    } catch (err) {
        console.error("Post creation error: ", err);
        next(err);
    }
}

async function deletePost(req, res, next) {
    const { postId } = req.params;
    const userId = req.user.id;

    try {
        const deletePost = await prisma.post.delete({
            where: {
                id: postId,
            },
        });

        res.status(200).json({
            "message": `post with id ${postId} deleted successfully`,
            "data": deletePost,
        });

    } catch (err) {
        console.error("Post creation error: ", err);
        next(err);
    }

}


module.exports = { postCreate, getPostMessage, getPostInfo, updatePost, deletePost };