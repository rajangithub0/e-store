import mongoose from "mongoose";

/* ----------------------------
   User Schema Definition
---------------------------- */
// Define the schema for the "User" model
const userSchema = new mongoose.Schema(
    {
        // User's full name
        name: {
            type: String,
            required: true,
            trim: true, // Removes extra spaces
        },
        // User's email address (must be unique)
        email: {
            type: String,
            required: true,
            unique: true,
        },
        // User's hashed password
        password: {
            type: String,
            required: true,
        },
        // User's phone number
        phone: {
            type: String,
            required: true,
        },
        // User's address
        address: {
            type: String,
            required: true,
        },
        // Answer for security questions (e.g., for password recovery)
        answer: {
            type: String,
            required: true,
        },
        // User's role (default is 0 for a regular user; can be changed for admin roles)
        role: {
            type: Number,
            default: 0, // 0: User, 1: Admin
        },
    },
    {
        // Automatically adds createdAt and updatedAt timestamps
        timestamps: true,
    }
);

// Export the model for use in the application
export default mongoose.model("users", userSchema);
