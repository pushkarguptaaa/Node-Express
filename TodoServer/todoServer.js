 const express = require('express');
  const bodyParser = require('body-parser');
  
  const app = express();
  const PORT = 3000;
  
  let todos = [];
  let nextid = 1;
  app.use(bodyParser.json());

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
    res.status(201).json({id: newTodo.id})
  })

  app.put('/todos/:id', (req, res)=>{
    const todo = todos.find(t=> t.id == parseInt(req.params.id))

    if(todo){
      const {title, description} = req.body;
      todo.title = (title !== undefined) ? title : todo.title
      todo.description = (description !== undefined) ? description : todo.description
      res.status(200).json({id: todo.id})
    }
    else res.status(404).send('Todo not found')
  })

  app.delete('/todos/:id', (req, res)=>{
    const todoind = todos.findIndex(t=> t.id == parseInt(req.params.id))

    if(todoind !== -1){
      todos.splice(todoind, 1)
      res.status(200).send('Todo deleted')
    }
    else res.status(404).send('Todo not found')
  })

  app.use((req, res)=>{
    res.status(404).send('Route not found')
  })

  // app.listen(PORT, ()=>{
  //   console.log('server running');
  // })

  module.exports = app;