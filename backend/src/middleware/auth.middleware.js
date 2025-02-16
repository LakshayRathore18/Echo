import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        // Find the user by decoded token's userId, excluding the password field
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Set the user in the request object
        req.user = user;

        next();
    } catch (err) {
        console.log("Error in protectRoute middleware", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
