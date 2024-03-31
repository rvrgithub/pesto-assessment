
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    title: { require: true, type: String },
    description: { type: String },
    status: { type: String, default: "pending" }
},
    { timestamps: true }
)

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
