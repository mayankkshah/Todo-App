const mainTodoElem = document.querySelector(".todo-list-elem");
const inputValue = document.querySelector("#inputValue");

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("todoList"));
};

const addTodoListLocalStorage = () => {
  return localStorage.setItem("todoList", JSON.stringify(localTodoList));
};

let localTodoList = getTodoListFromLocal() || [];

const addTodoDynamicElement = (todo) => {
  const divElem = document.createElement("div");

  divElem.classList.add("main_todo_div");

  divElem.innerHTML = `<li>${todo}</li> <button class="deleteBtn">Delete</button>`;

  mainTodoElem.appendChild(divElem);
};

const addTodoList = (e) => {
  e.preventDefault(); // prevent form from submitting

  const todoListValue = inputValue.value.trim();

  if (todoListValue !== "" && !localTodoList.includes(todoListValue)) {
    localTodoList.push(todoListValue);

    localTodoList = [...new Set(localTodoList)];

    console.log(localTodoList);

    localStorage.setItem("todoList", JSON.stringify(localTodoList));

    addTodoDynamicElement(todoListValue);
  }
};

const showTodoList = () => {
  localTodoList.forEach((todo) => {
    addTodoDynamicElement(todo);
  });
};

showTodoList();

//Remove data
const removeTodoElement = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.textContent;
  let parentElement = todoToRemove.parentElement;

  localTodoList = localTodoList.filter(
    (todo) => todo !== todoListContent.toLowerCase()
  );

  addTodoListLocalStorage(localTodoList);
  parentElement.remove();
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("deleteBtn")) {
    removeTodoElement(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});