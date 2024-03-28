const mongoose = require('mongoose');
exports.connection = () => {
    mongoose.connect("mongodb+srv://radhika:radhika123@cluster0.zrigz6i.mongodb.net/pesto-assessment", {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then((res) => {
        console.log('connections is succesfully');
    }).catch((error) => {
        console.log("connecton if fail ", error);
    });
}