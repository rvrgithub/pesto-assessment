// Importing mongoose library for MongoDB connection
const mongoose = require('mongoose');
require('dotenv').config();
/**
 * Function to establish a connection to MongoDB database
 */
exports.connection = () => {
    // Connection URL for MongoDB Atlas
    const url = process.env.MONGODB_URI;
    // Connecting to MongoDB Atlas using mongoose
    mongoose.connect(url, {
        // useNewUrlParser: true
    })
        .then((res) => {
            console.log('Connection is successful');    // Connection successful
        })
        .catch((error) => {
            console.log("Connection failed ", error);   // Connection failed
        });
}
