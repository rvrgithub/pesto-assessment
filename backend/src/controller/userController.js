const User = require("../model/userModel");
const { isValidName, isValidEmail, isValidPwd } = require("../utils/validation");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
// Function to handle user signup
exports.signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(401).send({
                status: false,
                massage: "All Credientials Are Required 1.. !!",
            });
        }
        // Check if all credentials are provided
        if (!firstName || !lastName || !email || !password) {
            return res.status(401).send({
                status: false,
                massage: "All credentials are required.",
            });
        }
        // Validate first name and last name

        if (!isValidName(firstName) || !isValidName(lastName)) {
            return res.status(401).send({
                status: false,
                message: "First and last name must contain only letters."
            });
        }


        // Validate email
        if (!isValidEmail(email)) {
            console.log("all are required");
            return res.status(401).send({
                status: false,
                message: "Invalid email address."
            });
        }
        // Validate password
        if (!isValidPwd(password)) {
            return res.status(401).send({
                status: false,
                message: "Password must be at least 8 characters long."
            });
        }

        // Check if user already exists
        const checkPassword = await User.findOne({ email });
        if (checkPassword) {
            return res.status(401).json({
                status: false,
                massage: "User already registered."
            });
        } else {
            // Hash password
            const hasmapPassword = await bcrypt.hash(password, 10);
            // Create new user
            const data = new User({
                firstName,
                lastName,
                password: hasmapPassword,
                email,
            });
            // Save user to database
            let response = await data.save();
            return res.status(201).json({
                status: true,
                massage: "register succesfully!!",
                response,
            });
        }
    } catch (error) {
        return res.status(401).json({
            status: false,
            massage: "Something Wrong !!",
            error,
        });
    }
}


// Function to handle user signin
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(401).send({
                status: false,
                massage: "Fill All Credientials...",
            });
        } // all are empty..
        // Check if credentials are provided
        if (!email || !password) {
            return res.status(401).json({
                status: false,
                message: "Email and password are required."
            });
        }// if any one is empty..

        // Validate email
        if (!isValidEmail(email)) {
            //   console.log("email is not valid");
            return res.status(401).send({
                status: false,
                message: "Invalid email address."
            });
        }

        // validate password
        if (!isValidPwd(password)) {
            //   console.log("all are required");
            return res.status(401).send({
                status: false,
                massage: "password is not valid !!",
            });
        }

        // Find user by email
        const findUser = await User.findOne({ email });
        console.log("user", findUser);

        // ................. check user.........................
        if (!findUser) {
            return res.status(401).json({
                status: false,
                massage: "User Not Found Please Register !!",
            });
        } else {

            const matchPasswrod = await bcrypt.compare(password, findUser.password);
            //   console.log("matchPasswrod", matchPasswrod);
            // Compare passwords
            if (!matchPasswrod) {
                return res.status(401).json({
                    status: false,
                    massage: "Password and Email Not Match!!",
                });
            } else {
                // Generate JWT token
                const token = jwt.sign({ id: findUser._id }, JWT_SECRET);
                console.log("token", token);
                return res.status(201).json({
                    status: true,
                    massage: "Login Successfully !!",
                    token,
                });
            }
        }
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};






// Function to get user profile
exports.getProfile = async (req, res) => {
    try {
        // Get user ID from request object
        const userId = req.user;
        return res.status(200).json({
            status: true,
            message: "User profile retrieved successfully.",
            userId
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

