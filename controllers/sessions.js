// controllers/sessions.js

const passport = require("passport");
const prisma = require("../prisma/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "loremipsum";

async function getSessionStatus(req, res, next) {
    const currentUser = req.user;

    if (!currentUser || !currentUser.id) {
        return res.status(401).json({ message: "User not authenticated." });
    }

    try {
        const data = await prisma.user.findUnique({
            where: {
                id: currentUser.id
            },
            include: {
                posts: {
                    orderBy: {
                        id: 'asc'
                    }
                }
            }
        });

        if (!data) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            message: 'User data retrieved successfully',
            user: { id: currentUser.id, name: currentUser.name, role: currentUser.role },
            data: data.posts,
        });
    } catch (error) {
        console.error("Error in getIndex:", error);
        next(error);
    }

}

module.exports = { getSessionStatus };