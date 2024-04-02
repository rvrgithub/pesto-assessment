const Todo = require("../model/todoModel")

// Controller to create a new todo
exports.postTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        // Create a new todo instance
        const response = new Todo({
            title,
            description,
            status,
            user: req.user._id // Associate todo with the user
        });
        await response.save(); // Save the todo
        return res.status(201).send({
            status: true,
            message: response // Return the created todo
        });
    } catch (error) {
        // Error handling
        return res.status(401).json({
            status: false,
            message: "Something went wrong!",
            error: error.message
        });
    }
};


// Controller to get all todos
exports.getTodo = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        console.log("page", limit)
        // Create a query object
        const query = {};
        if (search) {
            // Case-insensitive regex search for status
            query.status = { $regex: search, $options: 'i' };
        }
        // Count total documents based on the query
        const count = await Todo.countDocuments({ ...query, user: req.user._id });
        const skip = (parseInt(page) - 1) * parseInt(limit);
        // Fetch todos based on the query and user id
        const response = await Todo.find({ ...query, user: req.user._id })
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        return res.status(200).send({
            status: true,
            message: response,
            currentPage: parseInt(page),
            totalPage: Math.ceil(count / parseInt(limit)),
            totalItems: count,
            limit: parseInt(limit)
        });
    } catch (error) {
        // Error handling
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Controller to update a todo
exports.updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const todoRes = req.body;
        // Find and update the todo
        const response = await Todo.findByIdAndUpdate({ _id: id, user: req.user._id }, { $set: todoRes }, { returnDocument: 'after' });
        return res.status(201).send({
            status: true,
            message: "Todo updated successfully",
            response
        });
    } catch (error) {
        // Error handling
        return res.status(401).json({
            status: false,
            message: "Something went wrong!",
            error: error.message
        });
    }
};

// Controller to delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const todo_id = req.params.id;
        console.log("id", todo_id);
        const response = await Todo.findOne({ _id: todo_id, user: req.user._id })
        if (!response) {
            // If todo not found
            return res.status(201).send({
                status: false,
                message: "todo not found...",
                response
            })
        }
        else {
            // Delete the found todo
            const response = await Todo.deleteOne({ _id: todo_id });
            return res.status(201).send({
                status: true,
                message: "delete todo",
                response
            })
        }
    }
    catch (error) {
        // Error handling
        return res.status(401).json({
            stauts: false,
            message: "Something Wrong !!",
            error,
        });
    }
}







