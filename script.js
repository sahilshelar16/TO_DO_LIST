const newTodoInput = document.getElementById("newTodoInput");
const addTodoButton = document.getElementById("addTodoButton");
const todoList = document.getElementById("todoList");
const showActiveButton = document.getElementById("showActiveButton");

let todos = [];

addTodoButton.addEventListener("click", () => {
  const todo = newTodoInput.value;
  if (todo) {
    todos.push({
      text: todo,
      completed: false
    });
    updateTodoList();
    newTodoInput.value = "";
  }
});

todoList.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const index = parseInt(clickedElement.dataset.index);
  if (clickedElement.className === "deleteButton") {
    todos.splice(index, 1);
    updateTodoList();
  } else if (clickedElement.type === "checkbox") {
    todos[index].completed = clickedElement.checked;
    updateTodoList();
  }
});

showActiveButton.addEventListener("click", () => {
  const activeTodos = todos.filter((todo) => !todo.completed);
  alert(activeTodos.map((todo) => todo.text).join("\n"));
});

function updateTodoList() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.dataset.index = index;
    listItem.appendChild(checkbox);
    const text = document.createElement("span");
    text.innerText = todo.text;
    if (todo.completed) {
      text.className = "completed";
    }
    listItem.appendChild(text);
    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.innerText = "Delete";
    deleteButton.dataset.index = index;
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });
}