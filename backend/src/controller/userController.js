const User = require("../model/userModel");
const { isValidName, isValidEmail, isValidPwd } = require("../utils/validation");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// .......................... create user..................................

exports.signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(401).send({
                stauts: false,
                massage: "All Credientials Are Required 1.. !!",
            });
        }
        // .......................All Credientials Are Required....................
        if (!firstName || !lastName || !email || !password) {
            return res.status(401).send({
                stauts: false,
                massage: "All Credientials Are Required.. !!",
            });
        }
        //.......................error inside first name.......................
        if (!isValidName(firstName)) {
            return res.status(401).send({
                stauts: false,
                massage: "Only String valid !!",
            });
        }
        //.......................error inside last name.......................
        if (!isValidName(lastName)) {
            return res.status(401).send({
                stauts: false,
                massage: "Only String valid !!",
            });
        }

        //  .......................error inside email .......................
        if (!isValidEmail(email)) {
            console.log("all are required");
            return res.status(401).send({
                stauts: false,
                massage: "email is not valid !!",
            });
        }
        // ....................... error inside password .......................
        if (!isValidPwd(password)) {
            console.log("all are required");
            return res.status(401).send({
                stauts: false,
                massage: "password is not valid !!",
            });
        }

        // ....................find user  ..................................
        const checkPassword = await User.findOne({ email });
        //  .......................chack user if alreay register ........
        if (checkPassword) {
            return res.status(401).json({
                stauts: false,
                massage: "already register!!",
            });
        } else {
            // .......................create password strong ......
            const hasmapPassword = await bcrypt.hash(password, 10);
            const response = new User({
                firstName,
                lastName,
                password: hasmapPassword,
                email,
            });

            await response.save();
            return res.status(201).json({
                stauts: true,
                massage: "register succesfully!!",
                response,
            });
        }
    } catch (error) {
        return res.status(401).json({
            stauts: false,
            massage: "Something Wrong !!",
            error,
        });
    }
}

// .......................... get all todos..................................

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(401).send({
                status: false,
                massage: "Fill All Credientials...",
            });
        } // all are empty..
        if (!email || !password) {
            return res.status(401).json({
                stauts: false,
                massage: "Fill All Credientials",
            });
        }// if any one is empty..

        //  .......................error inside email .......................
        if (!isValidEmail(email)) {
            //   console.log("email is not valid");
            return res.status(401).send({
                stauts: false,
                massage: "email is not valid !!",
            });
        }

        // ....................... error inside password .......................
        if (!isValidPwd(password)) {
            //   console.log("all are required");
            return res.status(401).send({
                stauts: false,
                massage: "password is not valid !!",
            });
        }

        //.................find user ....................
        const findUser = await User.findOne({ email });
        console.log("user", findUser);

        // ................. check user.........................
        if (!findUser) {
            return res.status(401).json({
                stauts: false,
                massage: "User Not Found Please Register !!",
            });
        } else {
            //  ............... check passowrd  ............
            const matchPasswrod = await bcrypt.compare(password, findUser.password);
            //   console.log("matchPasswrod", matchPasswrod);
            // ..........................Match Password......................
            if (!matchPasswrod) {
                return res.status(401).json({
                    stauts: false,
                    massage: "Password and Email Not Match!!",
                });
            } else {
                // ...........................create Token..................................
                const token = jwt.sign({ id: findUser._id }, "dsjglsdkjhgkldjfg");
                console.log("token", token);
                return res.status(201).json({
                    stauts: true,
                    massage: "Login Successfully !!",
                    token,
                });
            }
        }
    } catch (error) {
        return res.status(401).json({
            stauts: false,
            massage: "Something Wrong !!",
            error,
        });
    }
};



