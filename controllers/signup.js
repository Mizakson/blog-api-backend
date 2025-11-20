// controllers/signUp.js

const { validationResult, body } = require("express-validator");
const prisma = require("../prisma/prisma");
const bcrypt = require("bcryptjs");

async function getSignUpMessage(req, res) {
    res.status(200).json({ "message": "hi from signup router!" });
}

async function postSignUp(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.error("Validation failed: ", errors.array());

        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
        });
    }

    try {
        const { username, password, role } = req.body;

        const hashedPw = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPw,
                role: role
            }
        });

        res.status(201).json({
            message: "User created successfully",
            data: {
                name: username,
                role: role,
            }
        });

    } catch (err) {
        console.error("User creation error", err);
        res.status(500).json({
            message: "An error occured while creating the user",
            error: err.message,
        });
    }
}

const validateUser = [
    body("username").isAlpha().notEmpty().withMessage("Please enter a username"),
    body("password").isLength({ min: 6 }).withMessage("Password must be a minimum of 6 characters"),
    body("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("Passwords must match"),
    body("role").custom((value, { req }) => value === "AUTHOR" || "BASIC").withMessage("Role must be either 'AUTHOR' or 'BASIC'")
];

module.exports = { getSignUpMessage, postSignUp, validateUser };