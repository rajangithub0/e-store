// Importing required modules and dependencies
import express from "express"; // Express framework for creating the router
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"; // Authentication and admin authorization middlewares
import {
    categoryController,
    CreateCategoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController,
} from "../controllers/categoryController.js"; // Importing category-related controllers

// Initialize the router
const router = express.Router();

/* 
    Category Creation Routes
    - POST /create-category: Endpoint to create a new category
    - Requires user to be signed in and have admin privileges
*/
router.post('/create-category', requireSignIn, isAdmin, CreateCategoryController);

/* 
    Category Update Routes
    - PUT /update-category/:id: Endpoint to update an existing category by its ID
    - Requires user to be signed in and have admin privileges
*/
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

/* 
    Category Retrieval Routes
    - GET /get-category: Fetch all categories
    - GET /single-category/:slug: Fetch a single category by its slug
*/
router.get('/get-category', categoryController);
router.get('/single-category/:slug', singleCategoryController);

/* 
    Category Deletion Routes
    - DELETE /delete-category/:id: Delete a category by its ID
    - Requires user to be signed in and have admin privileges
*/
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

// Export the router for use in the main application
export default router;
