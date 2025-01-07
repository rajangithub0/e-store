// Importing required modules and packages
import express from "express";
import colors from "colors"; // For console log colors
import dotenv from "dotenv"; // For environment variable management
import morgan from "morgan"; // For HTTP request logging
import connectDB from "./config/db.js"; // Database connection module
import authRoutes from "./routes/authRoute.js"; // Authentication routes
import categoryRoutes from './routes/categoryRoute.js'; // Category routes
import productRoutes from './routes/productRoute.js'; // Product routes
import cors from 'cors'; // For Cross-Origin Resource Sharing (CORS)

// Configuration and setup
dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to the database

// Initialize the Express app
const app = express();

// Middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan("dev")); // Log HTTP requests in development mode

// Route definitions
app.use("/api/v1/auth", authRoutes); // Authentication-related API routes
app.use("/api/v1/category", categoryRoutes); // Category-related API routes
app.use("/api/v1/product", productRoutes); // Product-related API routes

// Root endpoint
app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
});

// Server configuration
const PORT = process.env.PORT || 8080; // Define port from environment or default to 8080

// Start the server
app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
    );
});
