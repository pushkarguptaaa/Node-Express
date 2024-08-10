const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

const files = path.join(__dirname, 'todos.json')

function loadTodos(){
  if(fs.existsSync(files)){
    const data = fs.readFileSync(files, 'utf8')
    return JSON.parse(data)
  }
  return []
}

function saveTodos(todos){
  fs.writeFileSync(files, JSON.stringify(todos, null, 2))
}

let todos = loadTodos()
let nextid = todos.length > 0 ? Math.max(...todos.map(t=> t.id)) + 1 : 1;

app.get('/todos', (req, res)=>{
  res.status(200).json(todos)
})

app.get('/todos/:id', (req, res)=>{
  const todo = todos.find(t=> t.id == parseInt(req.params.id))

  if(todo) res.status(200).send(todo)
  else res.status(404).send('Todo not found')
})

app.post('/todos', (req, res)=>{
  const {title, description} = req.body
  const newTodo = {
    id: nextid++,
    title,
    description
  }
  todos.push(newTodo)
  saveTodos(todos)
  res.status(201).json({id: newTodo.id})
})

app.put('/todos/:id', (req, res)=>{
  const todo = todos.find(t=> t.id == parseInt(req.params.id))

  if(todo){
    const {title, description} = req.body;
    todo.title = (title !== undefined) ? title : todo.title
    todo.description = (description !== undefined) ? description : todo.description
    saveTodos(todos)
    res.status(200).json({id: todo.id})
  }
  else res.status(404).send('Todo not found')
})

app.delete('/todos/:id', (req, res)=>{
  const todoind = todos.findIndex(t=> t.id == parseInt(req.params.id))

  if(todoind !== -1){
    todos.splice(todoind, 1)
    saveTodos(todos)
    res.status(200).send('Todo deleted')
  }
  else res.status(404).send('Todo not found')
})

app.use((req, res)=>{
  res.status(404).send('Route not found')
})

app.listen(PORT, ()=>{
  console.log('server running');
})

module.exports = app;