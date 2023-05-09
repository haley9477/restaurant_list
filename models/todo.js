const mongoose = require('mongoose') // 載入
const Schema = mongoose.Schema // mongoose 提供模組
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean
  }
})
module.exports = mongoose.model('Todo', todoSchema)