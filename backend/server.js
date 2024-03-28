console.log("hello world");
const express = require('express');
const app = express();
const router = require("./src/router/router.js");
const { connection } = require('./src/connection/connection.js');
app.route("/", router)
app.listen(4000, () => {
    connection();
    console.log(`listen port at 4000`)
})