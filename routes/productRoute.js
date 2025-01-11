// Importing required modules and dependencies
import express from "express"; // Express framework for creating the router
import {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    searchProductController,
    updateProductController,
} from "../controllers/productController.js"; // Product-related controllers
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"; // Middleware for authentication and admin authorization
import formidable from "express-formidable"; // Middleware for handling form data, including file uploads

// Initialize the router
const router = express.Router();

/* 
    Product Creation and Update Routes
    - POST /create-product: Create a new product
    - PUT /update-product/:pid: Update an existing product by product ID
    - Both routes require the user to be signed in and have admin privileges
    - Uses formidable middleware to handle form data
*/
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

/* 
    Product Retrieval Routes
    - GET /get-product: Retrieve all products
    - GET /get-product/:slug: Retrieve a single product by its slug
    - GET /product-photo/:pid: Retrieve the photo of a product by product ID
*/
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);

/* 
    Product Deletion Route
    - DELETE /delete-product/:pid: Delete a product by its ID
*/
router.delete("/delete-product/:pid", deleteProductController);

/* 
    Product Filtering and Pagination Routes
    - POST /product-filters: Apply filters to retrieve specific products
    - GET /product-count: Get the total count of products
    - GET /product-list/:page: Get products paginated by the page number
*/
router.post("/product-filters", productFiltersController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);

//search product

router.get("/search/:keyword", searchProductController)

// Export the router for use in the main application
export default router;
