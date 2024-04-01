const express = require('express');
const { getTodo, postTodo, deleteTodo, updateTodo } = require('../controller/todoController');
const { signup, signin } = require('../controller/userController');
const { auth } = require('../middleware/auth');
const router = express.Router();
// ......... todoRoutes...................
router.get("/get-todo", getTodo);
router.post('/post-todo', postTodo);
router.delete("/delete-todo/:id", auth, deleteTodo);
router.put("/update-todo/:id", auth, updateTodo);


// ....... userRoutes....................
router.post("/signup",signup);
router.post("/signin",signin)
module.exports = router;