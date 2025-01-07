// Importing required modules and dependencies
import express from "express"; // Express framework for creating the router
import {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    updateProductController,
} from "../controllers/productController.js"; // Importing product-related controllers
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"; // Authentication and admin authorization middlewares
import formidable from "express-formidable"; // Middleware for handling form data, including file uploads

// Initialize the router
const router = express.Router();

/* 
    Product Creation Routes
    - POST /create-product: Endpoint to create a new product
    - Requires user to be signed in and have admin privileges
    - Uses formidable middleware to handle form data
*/
router.post(
    "/create-product", requireSignIn, isAdmin, formidable(), createProductController
);

/* 
    Product Update Routes
    - PUT /update-product/:pid: Endpoint to update an existing product by product ID
    - Requires user to be signed in and have admin privileges
    - Uses formidable middleware to handle form data
*/
router.put(
    "/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController
);

/* 
    Product Retrieval Routes
    - GET /get-product: Fetch all products
    - GET /get-product/:slug: Fetch a single product by its slug
*/
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);

/* 
    Product Photo Routes
    - GET /product-photo/:pid: Fetch the photo of a product by product ID
*/
router.get("/product-photo/:pid", productPhotoController);

/* 
    Product Deletion Routes
    - DELETE /delete-product/:pid: Delete a product by product ID
*/
router.delete("/delete-product/:pid", deleteProductController);

// Export the router for use in the main application
export default router;
