const { verifyToken } = require("../utils/jwt");

exports.verifyUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token is required"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};