import mongoose from "mongoose";

/* --------------------------------
   Category Schema Definition
-------------------------------- */
// Define the schema for the "Category" model
const categoryScheme = new mongoose.Schema(
    {
        // Name of the category
        name: {
            type: String, // Data type is String
            required: true, // Name is mandatory
            unique: true, // Ensures each category has a unique name
        },
        // SEO-friendly slug for the category
        slug: {
            type: String, // Data type is String
            lowercase: true, // Converts slug to lowercase for consistency
        },
    }
);

// Export the model for use in the application
export default mongoose.model("Category", categoryScheme);
