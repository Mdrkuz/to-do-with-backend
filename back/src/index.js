const express = require('express');
const cors = require('cors');
const app = express();
const TodoManager = require('./todo-manager')
const stubber = require('./todo-stub')
const UserManager = require("./user-manager");

const todoManager = new TodoManager();
const userManager = new UserManager();
//stubber(todoManager)
console.log(todoManager);

app.use(cors())
app.use(express.json())

app.get('/', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

//crud

app.put('/todo', function (req, res, next) {
  const token = req.headers.token
  const user = userManager.findByToken(token)

  const titleForNewTodo = req.body.title;
  const newTodo = todoManager.createTodo(titleForNewTodo, user)
  todoManager.addIfNotPresentedByTitle(newTodo)
  res.json(newTodo)
})

app.get('/todo', function (req, res, next) {
  const token = req.headers.token
  const user = userManager.findByToken(token)

  const filter = req.query.filter
  const searchText = req.query.searchText
  const sortField = req.query.sortField
  const sortDir = req.query.sortDir
  const page = req.query.page
  const limit = req.query.limit
  
  res.json(todoManager.getByFilterAndSearchTextAndSort(
    filter, searchText, sortField, sortDir, page, limit, user
  ))
})

app.get('/todo/:id', function (req, res, next) {
  const token = req.headers.token
  const user = userManager.findByToken(token)

  const id = Number(req.params.id)
  const response = todoManager.getById(id, user)

  if(response.user !== user.id) {
    return res.status(403).json({status: 403, error: 'Not allowed'})
  }

  res.json(response)
})

app.post('/todo/:id', function (req, res, next) {
  const token = req.headers.token
  const user = userManager.findByToken(token)

  const id = Number(req.params.id)
  const changeSet = req.body

  todoManager.changeTodo(id, changeSet, user)
  const response = todoManager.getById(id, user)

  if(response.user !== user.id) {
    return res.status(403).json({status: 403, error: 'Not allowed'})
  }

  res.json(response)
})

app.delete('/todo/:id', function (req, res, next) {
  const id = Number(req.params.id)
  todoManager.remove(id)
  res.json({id})
})

app.put('/signup', function (req, res, next) {
  const userInfo = req.body
  const newUser = userManager.createUser(userInfo.name, userInfo.password)
  userManager.addIfNotPresentedByName(newUser)
  res.json({newUser})
})

app.put('/login', function (req, res, next) {
  const userInfo = req.body
  const user = userManager.findByName(userInfo.name)
  if (userInfo.password === user.password) {
    const token = Math.random().toString()
    user.setToken(token)
    res.json({token: token})
  } else {
    console.log('incorrect password');
  }
})

app.post('/logout', function (req, res) {
  const user = req.headers.token
  userManager.remove(user)
  res.json('ok')
})

app.listen(4000, function () {
  console.log('CORS-enabled web server listening on port 80')
})