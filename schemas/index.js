const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/simple_blog_2nd")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("Failed to connect to MongoDB", err);
});

module.exports = connect;