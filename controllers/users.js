// controllers/users.js

const prisma = require("../prisma/prisma");

async function getUserMessage(req, res) {
    res.status(200).json({ "message": "hi from users router!" });
}

async function getUserInfo(req, res, next) {

    const userId = req.params.userId;

    try {
        const idQuery = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                username: true,
                role: true
            }
        });

        if (idQuery == null) {
            res.status(404).json({ message: "user not found" });
        }

        res.status(200).json({
            "message": "user info retrieved!",
            "data": idQuery
        });
    } catch (err) {
        console.error("error while getting user info: ", err);
        next(err);
    }

}

module.exports = { getUserMessage, getUserInfo };