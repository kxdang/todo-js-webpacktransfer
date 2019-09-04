import uuidv4 from "uuid/v4";

let todos = [];

const loadTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  try {
    todos = todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    todos = [];
  }
};

const savedTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => todos;

const createTodo = text => {
  todos.push({
    id: uuidv4(),
    text,
    completed: false
  });
  savedTodos();
};

const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id); // returns a number greater than -1 if there is a match

  //if the number is greater than -1 there's a match and we want to splice the array of objects
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    savedTodos();
  }
};

const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
    savedTodos();
  }
};

loadTodos();
// Make sure to call loadTodos and setup the exports
export { loadTodos, savedTodos, getTodos, createTodo, removeTodo, toggleTodo };
