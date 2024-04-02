
const mongoose = require("mongoose");
// Define the schema for Todo
const todoSchema = new mongoose.Schema({
    title: { require: true, type: String },// Title of the todo (required)
    description: { type: String },// Description of the todo
    status: { type: String, default: "pending" },// Status of the todo (default: "pending")
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },// Reference to the user who owns the todo
}, { timestamps: true }); // Adding timestamps to track creation and modification


// Create the Todo model
const Todo = mongoose.model("Todo", todoSchema);

// Export the Todo model
module.exports = Todo;




