import JWT from "jsonwebtoken"; // Import the jsonwebtoken library to handle JWT operations
import userModel from "../models/userModel.js"; // Import the user model to query the database

// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization; // Get token from Authorization header
        if (!token) { // Check if token is not present
            return res.status(401).json({
                success: false,
                message: "No token provided", // Respond with error if token is missing
            });
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET); // Verify the JWT token using the secret key
        req.user = decode; // Attach decoded user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT verification failed:", error); // Log error if JWT verification fails
        res.status(401).json({
            success: false,
            message: "Invalid or expired token", // Respond with error if token is invalid or expired
        });
    }
};

// Admin access middleware
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id); // Fetch the user from the database using the decoded user ID
        if (!user || user.role !== 1) { // Check if user is not found or not an admin
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only.", // Respond with error if user is not an admin
            });
        }
        next(); // Proceed to the next middleware or route handler if the user is an admin
    } catch (error) {
        console.error("Admin check failed:", error); // Log error if there’s an issue in fetching user or checking role
        res.status(500).json({
            success: false,
            message: "Error in admin middleware", // Respond with error if there's an internal server issue
        });
    }
};
