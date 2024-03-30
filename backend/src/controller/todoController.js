const Todo = require("../model/todoModel")


// .......................... create todo..................................

exports.postTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const response = new Todo({
            title, description, status
        });
        await response.save();
        return res.status(201).send({
            status: true,
            message: response
        })
    }
    catch (error) {
        return res.status(401).json({
            stauts: false,
            massage: "Something Wrong !!",
            error,
        });
    }
}

// .......................... get all todos..................................

exports.getTodo = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        console.log("page", page, "limit", limit, "search", search);
        const query = {};
        if (search) {
            query.status = { $regex: search, $options: 'i' }; // Case-insensitive regex search
        }
        const count = await Todo.countDocuments(query);
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const response = await Todo.find(query)
            .skip(skip)
            .limit(parseInt(limit));

        return res.status(200).send({
            status: true,
            message: response,
            currentPage: parseInt(page),
            totalPage: Math.ceil(count / parseInt(limit)),
            totalItems: count,
            limit: parseInt(limit)
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};


// .......................... update todos..................................
exports.updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const todoRes = req.body;
        const response = await Todo.findByIdAndUpdate({ _id: id }, { $set: todoRes }, { returnDocument: 'after' });
        return res.status(201).send({
            status: true,
            message: "update todo",
            response
        })
    }
    catch (error) {
        return res.status(401).json({
            stauts: false,
            massage: "Something Wrong !!",
            error,
        });
    }
}


// .......................... delete todos..................................
exports.deleteTodo = async (req, res) => {
    try {
        const todo_id = req.params.id;
        console.log("id", todo_id);
        const response = await Todo.findOne({ _id: todo_id })
        if (!response) {
            return res.status(201).send({
                status: false,
                message: "todo not found...",
                response
            })
        }
        else {
            const response = await Todo.deleteOne({ _id: todo_id });
            return res.status(201).send({
                status: true,
                message: "delete todo",
                response
            })
        }
    }
    catch (error) {
        return res.status(401).json({
            stauts: false,
            massage: "Something Wrong !!",
            error,
        });
    }
}
