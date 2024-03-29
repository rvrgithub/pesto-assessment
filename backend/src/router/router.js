const express = require('express');
const { getTodo, postTodo, deleteTodo, updateTodo } = require('../controller/todoController');
const router = express.Router();
router.get("/get-todo", getTodo);
router.post('/post-todo',postTodo);
router.delete("/delete-todo/:id",deleteTodo)
router.put("/update-todo/:id",updateTodo)

module.exports = router;