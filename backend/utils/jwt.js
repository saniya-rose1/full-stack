const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;

if (!JWT_SECRET) {
    throw new Error("JWT secret is not configured. Set JWT_SECRET or JWT_SECRET_KEY in .env");
}

exports.generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1d"
    });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};