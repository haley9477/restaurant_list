const mongoose = require('mongoose') // 載入
const Schema = mongoose.Schema // mongoose 提供模組
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  rating: {
    type: String
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  google_map: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  done: {
    type: Boolean
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)