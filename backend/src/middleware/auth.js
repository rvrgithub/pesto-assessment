const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET
// Middleware for user authentication
exports.auth = async (req, res, next) => {
    // Check if Authorization header exists and starts with "Bearer"
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        return res.status(400).json("Invalid token");
    }
    // Extract token from Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        // Find user based on decoded user ID
        const findUser = await User.findOne({ _id: decode.id });

        if (findUser) {
            // Attach user object to request for further processing
            req.user = findUser;
            // Call next middleware
            next();
        } else {
            // Return error if user not found
            return res.status(400).send("Invalid token");
        }
    } catch (error) {
        // Return error if token verification fails
        return res.status(400).send("Invalid token");
    }
};


