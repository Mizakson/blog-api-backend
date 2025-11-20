// controllers/login.js

const prisma = require("../prisma/prisma");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "loremipsum";

async function getLoginMessage(req, res) {
    res.status(200).json({ "message": "hi from login router!" });
}

async function postLogin(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const payload = {
            id: user.id,
            username: user.username,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); // 1 day token expiry

        return res.status(200).json({
            message: "Login successful",
            token: "Bearer " + token,
            data: {
                id: payload.id,
                username: payload.username
            }
        });

    } catch (err) {
        console.error("Login error: ", err);
        next(err);
    }
}

module.exports = { getLoginMessage, postLogin };