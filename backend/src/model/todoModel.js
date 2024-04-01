
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    title: { require: true, type: String },
    description: { type: String },
    status: { type: String, default: "pending" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
    { timestamps: true }
)

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
