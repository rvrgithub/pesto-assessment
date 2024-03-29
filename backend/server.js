console.log("hello world");
const express = require('express');
const app = express();
const cors = require("cors")
const router = require("./src/router/router.js");
const { connection } = require('./src/connection/connection.js');
app.use(cors())
app.use(express.json());
app.use("/", router);

app.listen(4000, () => {
    connection();
    console.log(`listen port at 4000`)
})