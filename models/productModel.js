import mongoose from "mongoose";

/* --------------------------------
   Product Schema Definition
-------------------------------- */
// Define the schema for the "Product" model
const productSchema = new mongoose.Schema(
    {
        // Product name
        name: {
            type: String,
            required: true, // Name is mandatory
        },
        // Unique slug for the product (used for SEO-friendly URLs)
        slug: {
            type: String,
            required: true, // Slug is mandatory
        },
        // Detailed description of the product
        description: {
            type: String,
            required: true, // Description is mandatory
        },
        // Price of the product
        price: {
            type: Number,
            required: true, // Price is mandatory
        },
        // Reference to the product's category
        category: {
            type: mongoose.ObjectId, // Refers to the ObjectId of a Category document
            ref: "Category", // Specifies the referenced collection
            required: true, // Category is mandatory
        },
        // Available quantity of the product in stock
        quantity: {
            type: Number,
            required: true, // Quantity is mandatory
        },
        // Product image (stored as binary data and its content type)
        photo: {
            data: Buffer, // Binary data for the photo
            contentType: String, // MIME type of the photo (e.g., 'image/jpeg')
        },
        // Indicates if the product requires shipping
        shipping: {
            type: Boolean, // True if the product requires shipping
        },
    },
    {
        // Automatically adds createdAt and updatedAt timestamps
        timestamps: true,
    }
);

// Export the model for use in the application
export default mongoose.model("Products", productSchema);
