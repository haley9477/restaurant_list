const mongoose = require('mongoose')
const Todo = require('../todo')
const restaurantList = require('../../restaurant.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Todo.create(restaurantList)
    .then(() => {
      console.log('done')
      db.close()
    })
    .catch(error => console.log(error))
})