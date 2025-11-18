// controllers/logout.js

async function getLogoutMessage(req, res) {
    res.status(200).json({ "message": "logged out successfully. (please delete token client-side)" });
}

module.exports = { getLogoutMessage };