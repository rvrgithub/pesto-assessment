
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    title: { require: true, type: String },
    description: { type: String },
    stauts: { type: String, default: "pending" }
})

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
