document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
      addTodo();
    }
  });
});

function validateForm() {
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  if (title.trim() === '' || date.trim() === '') {
    alert('Judul dan Tanggal harus diisi');
    return false;
  }
  return true;
}

function addTodo() {
  const textTodo = document.getElementById('title').value;
  const timestamp = document.getElementById('date').value;

  const generatedID = generateId();
  const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
  return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted
  };
}

const todos = [];
const RENDER_EVENT = 'render-todo';
document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById('todos');
  uncompletedTODOList.innerHTML = '';

  const completedTODOList = document.getElementById('completed-todos');
  completedTODOList.innerHTML = '';

  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isCompleted)
      uncompletedTODOList.append(todoElement);
    else
      completedTODOList.append(todoElement);
  }
});

function makeTodo(todoObject) {
  const textTitle = document.createElement('h2');
  textTitle.innerText = todoObject.task;
 
  const textTimestamp = document.createElement('p');
  textTimestamp.innerText = todoObject.timestamp;
 
  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textTimestamp);
 
  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.setAttribute('id', `todo-${todoObject.id}`);
  container.append(textContainer);
  
  const checkButton = document.createElement('button');
  checkButton.classList.add('check-button');
  checkButton.textContent = 'Check';
  checkButton.addEventListener('click', function () {
    toggleTaskStatus(todoObject.id);
  });
  
  container.append(checkButton);
 
  if (todoObject.isCompleted) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
    undoButton.textContent = 'Undo';
    undoButton.addEventListener('click', function () {
      toggleTaskStatus(todoObject.id);
    });
 
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.textContent = 'Delete';
    trashButton.addEventListener('click', function () {
      removeTask(todoObject.id);
    });
 
    container.append(undoButton, trashButton);
  }
 
  return container;
}

function toggleTaskStatus(todoId) {
  const todoTarget = findTodo(todoId);
 
  if (todoTarget == null) return;
 
  todoTarget.isCompleted = !todoTarget.isCompleted;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function removeTask(todoId) {
  const index = todos.findIndex(todo => todo.id === todoId);
  if (index !== -1) {
    todos.splice(index, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
}

function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}
//coret coretan cara sebelumnya 
// document.addEventListener('DOMContentLoaded', function () {
//   const submitForm = document.getElementById('form');
//   submitForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     if (validateForm()) {
//       addTodo();
//     }
//   });
// });

// function validateForm() {
//   // Tambahkan validasi form di sini
//   // Misalnya, jika ingin memeriksa apakah judul dan tanggal diisi:
//   const title = document.getElementById('title').value;
//   const date = document.getElementById('date').value;
//   if (title.trim() === '' || date.trim() === '') {
//     alert('Judul dan Tanggal harus diisi');
//     return false;
//   }
//   return true;
// }

// function addTodo() {
//   const textTodo = document.getElementById('title').value;
//   const timestamp = document.getElementById('date').value;

//   const generatedID = generateId();
//   const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
//   todos.push(todoObject);

//   document.dispatchEvent(new Event(RENDER_EVENT));
// }

// function generateId() {
//   return +new Date();
// }

// function generateTodoObject(id, task, timestamp, isCompleted) {
//   return {
//     id,
//     task,
//     timestamp,
//     isCompleted
//   };
// }

// const todos = [];
// const RENDER_EVENT = 'render-todo';
// document.addEventListener(RENDER_EVENT, function () {
//   const uncompletedTODOList = document.getElementById('todos');
//   uncompletedTODOList.innerHTML = '';

//   for (const todoItem of todos) {
//     const todoElement = makeTodo(todoItem);
//     uncompletedTODOList.append(todoElement);
//   }
// });

// function makeTodo(todoObject) {
//   const textTitle = document.createElement('h2');
//   textTitle.innerText = todoObject.task;
 
//   const textTimestamp = document.createElement('p');
//   textTimestamp.innerText = todoObject.timestamp;
 
//   const textContainer = document.createElement('div');
//   textContainer.classList.add('inner');
//   textContainer.append(textTitle, textTimestamp);
 
//   const container = document.createElement('div');
//   container.classList.add('item', 'shadow');
//   container.setAttribute('id', `todo-${todoObject.id}`);
//   container.append(textContainer);
 
//   return container;
// }

// document.addEventListener('DOMContentLoaded', function () {
//   const submitForm = document.getElementById('form');
//   submitForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     if (validateForm()) {
//       addTodo();
//     }
//   });
// });

// function validateForm() {
//   // Tambahkan validasi form di sini
//   // Misalnya, jika ingin memeriksa apakah judul dan tanggal diisi:
//   const title = document.getElementById('title').value;
//   const date = document.getElementById('date').value;
//   if (title.trim() === '' || date.trim() === '') {
//     alert('Judul dan Tanggal harus diisi');
//     return false;
//   }
//   return true;
// }

// function addTodo() {
//   const textTodo = document.getElementById('title').value;
//   const timestamp = document.getElementById('date').value;

//   const generatedID = generateId();
//   const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
//   todos.push(todoObject);

//   document.dispatchEvent(new Event(RENDER_EVENT));
// }

// function generateId() {
//   return +new Date();
// }

// function generateTodoObject(id, task, timestamp, isCompleted) {
//   return {
//     id,
//     task,
//     timestamp,
//     isCompleted
//   };
// }

// const todos = [];
// const RENDER_EVENT = 'render-todo';
// document.addEventListener(RENDER_EVENT, function () {
//   const uncompletedTODOList = document.getElementById('todos');
//   uncompletedTODOList.innerHTML = '';

//   for (const todoItem of todos) {
//     const todoElement = makeTodo(todoItem);
//     uncompletedTODOList.append(todoElement);
//   }
// });

// function makeTodo(todoObject) {
//   const textTitle = document.createElement('h2');
//   textTitle.innerText = todoObject.task;
 
//   const textTimestamp = document.createElement('p');
//   textTimestamp.innerText = todoObject.timestamp;
 
//   const textContainer = document.createElement('div');
//   textContainer.classList.add('inner');
//   textContainer.append(textTitle, textTimestamp);
 
//   const container = document.createElement('div');
//   container.classList.add('item', 'shadow');
//   container.setAttribute('id', `todo-${todoObject.id}`);
//   container.append(textContainer);
 
//   return container;
// }
// function makeTodo(todoObject) {
//   // .....
  
//   if (todoObject.isCompleted) {
//     const undoButton = document.createElement('button');
//     undoButton.classList.add('undo-button');
 
//     undoButton.addEventListener('click', function () {
//       undoTaskFromCompleted(todoObject.id);
//     });
 
//     const trashButton = document.createElement('button');
//     trashButton.classList.add('trash-button');
 
//     trashButton.addEventListener('click', function () {
//       removeTaskFromCompleted(todoObject.id);
//     });
 
//     container.append(undoButton, trashButton);
//   } else {
//     const checkButton = document.createElement('button');
//     checkButton.classList.add('check-button');
    
//     checkButton.addEventListener('click', function () {
//       addTaskToCompleted(todoObject.id);
//     });
    
//     container.append(checkButton);
//   }
 
//   return container;
// }
// const checkButton = document.createElement('button');
// checkButton.classList.add('check-button');
 
// checkButton.addEventListener('click', function () {
//   addTaskToCompleted(todoObject.id);
// });
 
// container.append(checkButton);
// function addTaskToCompleted (todoId) {
//   const todoTarget = findTodo(todoId);
 
//   if (todoTarget == null) return;
 
//   todoTarget.isCompleted = true;
//   document.dispatchEvent(new Event(RENDER_EVENT));
// }
// function findTodo(todoId) {
//   for (const todoItem of todos) {
//     if (todoItem.id === todoId) {
//       return todoItem;
//     }
//   }
//   return null;
// }
// document.addEventListener(RENDER_EVENT, function () {
//   const uncompletedTODOList = document.getElementById('todos');
//   uncompletedTODOList.innerHTML = '';
 
//   for (const todoItem of todos) {
//     const todoElement = makeTodo(todoItem);
//     if (!todoItem.isCompleted) {
//       uncompletedTODOList.append(todoElement);
//     }
//   }
// });

