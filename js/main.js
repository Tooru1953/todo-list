//todo находим элементы на странице
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

// добавление задачи
form.addEventListener("submit", addTask);

// удаление задачи
tasksList.addEventListener("click", deleteTask);

// отмечаем задачу завершенной
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  // отменяет отправку формы
  event.preventDefault();

  // достаём текст задачи из поля ввода
  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  // добавляем задачу в массив с задачами
  tasks.push(newTask);

  // формируем css класс
  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  // формируем разметку для новой задачи
  const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
  <span class="${cssClass}">${newTask.text}</span>
  <div class="task-item__buttons">
    <button type="button" data-action="done" class="btn-action">
      <img src="./img/tick.svg" alt="Done" width="18" height="18" />
    </button>
    <button type="button" data-action="delete" class="btn-action">
      <img src="./img/cross.svg" alt="Done" width="18" height="18" />
    </button>
  </div>
  </li>`;

  // добавляем задачу на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  // очищаем поле ввода и возвращаем на него фокус
  taskInput.value = "";
  taskInput.focus();

  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

function deleteTask(event) {
  console.log(event.target);

  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest("li");

    // определяем id задачи
    const id = Number(parentNode.id);

    // находим индекс задачи в массиве
    const index = tasks.findIndex(function (task) {
      return task.id === id;
    });

    // удаляем задачу из массива с задачами
    tasks.splice(index, 1);

    // удаляем задачу из разметки
    parentNode.remove();

    if (tasksList.children.length === 1) {
      emptyList.classList.remove("none");
    }
  }
}

function doneTask(event) {
  // проверяем что клик был по кнопке "Задача выполнена"
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".list-group-item");

    // определяем id задачи
    const id = Number(parentNode.id);

    const task = tasks.find(function (task) {
      if (task.id === id) {
        return true;
      }
    });

    task.done = !task.done;

    const taskTitle = parentNode.querySelector(".task-title");
    taskTitle.classList.toggle("task-title--done");
  }
}
