const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true
  },
  user: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  password: {
    type: String
  },
  createdAt: {
    type: Number
  }
});

module.exports = mongoose.model("Goods", goodsSchema);