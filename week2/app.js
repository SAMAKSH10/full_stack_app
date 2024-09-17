const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for todos
let todos = [];


class TodoItemFormatter {
  formatTask(task) {
    return task.length > 14 ? task.slice(0, 14) + "..." : task;
  }

  formatDueDate(dueDate) {
    return dueDate || "No due date";
  }

  formatStatus(completed) {
    return completed ? "Completed" : "Pending";
  }
}

const todoItemFormatter = new TodoItemFormatter();

// Utility function to generate a random ID
function getRandomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Serve the HTML file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes for the Todo API

// GET /todos: Retrieve all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos: Add a new todo
app.post('/todos', (req, res) => {
  const { task, dueDate } = req.body;

  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  const newTodo = {
    id: getRandomId(),
    task: todoItemFormatter.formatTask(task),
    dueDate: todoItemFormatter.formatDueDate(dueDate),
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id: Edit a specific todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.task = todoItemFormatter.formatTask(task);
  res.json(todo);
});

// DELETE /todos/:id: Delete a specific todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

// PATCH /todos/:id/toggle: Toggle the completion status of a todo
app.patch('/todos/:id/toggle', (req, res) => {
  const { id } = req.params;

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.completed = !todo.completed;
  res.json(todo);
});

// Start the server
app.listen(port, () => {
  console.log(`Todo API listening at http://localhost:${port}`);
});
