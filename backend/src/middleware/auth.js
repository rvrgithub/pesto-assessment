const User = require("../model/userModel");
const jwt = require("jsonwebtoken")
exports.auth = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        return res.status(400).json("Invalid token");
    }
    if (req.headers.authorization.startsWith("Bearer") == false) {
        return res.status(400).json("Invalid token");
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decode = jwt.verify(token, "radhika");
    console.log(decode)

    const findUser = await User.findOne({ _id: decode.id });

    if (findUser) {
        // console.log("userFind", findUser);
        req.user = findUser;

    }
    else {
        return res.send("invalid token")
    }
    next();
};

