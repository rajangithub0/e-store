// Importing required modules and dependencies
import express from "express"; // Express framework for creating the router
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
} from "../controllers/authController.js"; // Authentication-related controllers
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"; // Middleware for authentication and admin authorization

// Initialize the router
const router = express.Router();

/* 
    Authentication Routes
    - POST /register: User registration
    - POST /login: User login
    - POST /forgot-password: Password recovery
*/
router.post("/register", registerController); // Register a new user
router.post("/login", loginController); // Login a user
router.post('/forgot-password', forgotPasswordController); // Handle forgot password requests

/* 
    Test Route
    - GET /test: Route to test admin access
    - Requires user to be signed in and have admin privileges
*/
router.get("/test", requireSignIn, isAdmin, testController);

/* 
    Protected User Routes
    - GET /user-auth: Check if a signed-in user is authenticated
    - GET /admin-auth: Check if a signed-in user has admin privileges
*/
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// Export the router for use in the main application
export default router;
