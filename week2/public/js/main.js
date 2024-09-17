document.querySelector('.add-task-button').addEventListener('click', () => {
  const taskInput = document.querySelector('.input');
  const dueDateInput = document.querySelector('.schedule-date');
  
  const task = taskInput.value;
  const dueDate = dueDateInput.value;

  fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task, dueDate })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Todo added:', data);
    displayTodo(data); 
    taskInput.value = ''; 
    dueDateInput.value = '';
  })
  .catch(error => {
    console.error('Error adding todo:', error);
  });
});

// Function to display a todo item
function displayTodo(todo) {
  const todosListBody = document.querySelector('.todos-list-body');

  // Create a new row for the todo item
  const todoRow = document.createElement('tr');
  todoRow.innerHTML = `
    <td>${todo.task}</td>
    <td>${todo.dueDate}</td>
    <td>${todo.completed ? 'Completed' : 'Pending'}</td>
    <td>
      <button class="btn btn-secondary toggle-button" data-id="${todo.id}">Toggle</button>
      <button class="btn btn-secondary delete-button" data-id="${todo.id}">Delete</button>
    </td>
  `;

  todosListBody.appendChild(todoRow);
}

//Add event listeners for the toggle and delete buttons
document.querySelector('.todos-list-body').addEventListener('click', event => {
  if (event.target.classList.contains('toggle-button')) {
    const id = event.target.dataset.id;

    fetch(`/todos/${id}/toggle`, {
      method: 'PATCH'
    })
    .then(response => response.json())
    .then(data => {
      // Update the row with new status
      event.target.parentElement.parentElement.children[2].textContent = data.completed ? 'Completed' : 'Pending';
    })
    .catch(error => {
      console.error('Error toggling todo:', error);
    });
  }

  if (event.target.classList.contains('delete-button')) {
    const id = event.target.dataset.id;

    fetch(`/todos/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      // Remove the row from the table
      event.target.parentElement.parentElement.remove();
    })
    .catch(error => {
      console.error('Error deleting todo:', error);
    });
  }
});
