// Importing necessary modules
const express = require('express');
const cors = require("cors");
const { connection } = require('./src/connection/connection.js');
const router = require("./src/router/router.js");
require('dotenv').config(); // Import dotenv and call config
// Creating an Express application instance
const app = express();

// Using CORS middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Parsing incoming JSON data
app.use(express.json());

// Setting up routes using the imported router
app.use("/", router);

// Starting the server and listening on port 4000

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    // Establishing database connection
    connection();
    // Logging server start message
    console.log("port", PORT)
    console.log(`Server is running on port ${PORT}`);
});
