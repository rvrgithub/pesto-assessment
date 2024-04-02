const express = require('express');
const router = express.Router();

// Importing controllers and middleware
const {
    getTodo,
    postTodo,
    deleteTodo,
    updateTodo
} = require('../controller/todoController');

const {
    signup,
    signin,
    getProfile
} = require('../controller/userController');

const { auth } = require('../middleware/auth');

// Todo Routes
// GET request to fetch todos
router.get("/get-todo", auth, getTodo);

// POST request to add a new todo
router.post('/post-todo', auth, postTodo);

// DELETE request to delete a todo by ID
router.delete("/delete-todo/:id", auth, deleteTodo);

// PUT request to update a todo by ID
router.put("/update-todo/:id", auth, updateTodo);


// User Routes
// POST request for user registration
router.post("/signup", signup);

// POST request for user login
router.post("/signin", signin);

// GET request to fetch user profile
router.get("/profile", auth, getProfile);

module.exports = router;
