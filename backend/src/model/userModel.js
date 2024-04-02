// Importing mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Defining the user schema using mongoose.Schema
const userSchema = new mongoose.Schema({
    // Defining properties of the user
    firstName: { type: String, required: true }, // First name of the user
    lastName: { type: String, required: true }, // Last name of the user
    email: { type: String, required: true }, // Email of the user
    password: { type: String, required: true }, // Password of the user
},
    { timestamps: true } // Adding timestamps for createdAt and updatedAt
);

// Creating a User model using the defined schema
const User = mongoose.model("User", userSchema);

// Exporting the User model to be used in other files
module.exports = User;
