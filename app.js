// packages
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const app = express()

// variables
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// connect mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static engine
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

// routes setting 
// 瀏覽全部餐廳
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))
})

// 新增餐廳頁面
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// 新增餐廳
app.post('/todos', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const rating = req.body.rating
  const image = req.body.image
  return Todo.create({ name, category, rating, image })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定餐廳
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// 編輯餐廳頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// 更新餐廳
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const rating = req.body.rating
  const image = req.body.image
  const phone = req.body.phone
  const location = req.body.location
  const google_map = req.body.google_map
  const description = req.body.description
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.category = category
      todo.rating = rating
      todo.image = image
      todo.phone = phone
      todo.location = location
      todo.google_map = google_map
      todo.description = description
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// 刪除餐廳
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 搜尋特定餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  Todo.find()
    .lean()
    .then(todos => {
      const filterRestaurantsData = todos.filter(data => data.name.trim().toLowerCase().includes(keyword) || data.category.trim().toLowerCase().includes(keyword))
      res.render('index', { todos: filterRestaurantsData, keyword })
    })
    .catch(error => console.log(error))  
})

// start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})