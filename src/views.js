import { getFilters } from "./filters";
import { getTodos, toggleTodo, removeTodo } from "./todos";
// renderTodos
// Arguments: none
// Return value: none

const renderTodos = () => {
  const todoEl = document.querySelector("#todos");
  const filters = getFilters();
  const filteredTodos = getTodos().filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  todoEl.innerHTML = "";
  todoEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "There are no to-dos to show";
    todoEl.appendChild(messageEl);
  }
};

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
const generateTodoDOM = todo => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  //Setup a todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  //Setup a text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  //set up container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  //Setup a button to remove
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);

  // add event listener to button
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    renderTodos();
  });

  return todoEl;
};

const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");
  summary.textContent =
    incompleteTodos.length > 1 || incompleteTodos.length == 0
      ? `You have ${incompleteTodos.length} todos left`
      : `You have ${incompleteTodos.length} todo left`;

  return summary;
};

// Make sure to set up the exports
export { renderTodos, generateTodoDOM, generateSummaryDOM };
