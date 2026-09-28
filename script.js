// =========================
// ELEMENTOS DEL DOM
// =========================

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const taskCounter = document.querySelector("#task-counter");
const emptyState = document.querySelector("#empty-state");
const clearCompletedButton = document.querySelector("#clear-completed");


// =========================
// DATOS
// =========================

let tasks = [];


// =========================
// AGREGAR TAREA
// =========================

todoForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    todoInput.value = "";

    renderTasks();

});


// =========================
// MOSTRAR TAREAS
// =========================

function renderTasks() {

    todoList.innerHTML = "";

    tasks.forEach((task) => {

        const listItem = document.createElement("li");

        listItem.classList.add("todo-item");

        if (task.completed) {
            listItem.classList.add("completed");
        }


        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-check");

        checkbox.checked = task.completed;


        // Texto

        const taskText = document.createElement("span");

        taskText.classList.add("task-text");

        taskText.textContent = task.text;


        // Botón eliminar

        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-task");

        deleteButton.textContent = "×";

        deleteButton.setAttribute(
            "aria-label",
            "Eliminar tarea"
        );


        // Completar tarea

        checkbox.addEventListener("change", () => {

            task.completed = checkbox.checked;

            renderTasks();

        });


        // Eliminar tarea

        deleteButton.addEventListener("click", () => {

            tasks = tasks.filter((item) => {
                return item.id !== task.id;
            });

            renderTasks();

        });


        // Agregar elementos

        listItem.appendChild(checkbox);

        listItem.appendChild(taskText);

        listItem.appendChild(deleteButton);

        todoList.appendChild(listItem);

    });


    updateTaskCounter();

    updateEmptyState();

}


// =========================
// CONTADOR
// =========================

function updateTaskCounter() {

    const pendingTasks = tasks.filter((task) => {
        return !task.completed;
    });

    const total = pendingTasks.length;


    if (total === 1) {

        taskCounter.textContent =
            "1 tarea pendiente";

    } else {

        taskCounter.textContent =
            `${total} tareas pendientes`;

    }

}


// =========================
// ESTADO VACÍO
// =========================

function updateEmptyState() {

    if (tasks.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }

}


// =========================
// LIMPIAR COMPLETADAS
// =========================

clearCompletedButton.addEventListener("click", () => {

    tasks = tasks.filter((task) => {
        return !task.completed;
    });

    renderTasks();

});


// =========================
// INICIAR APLICACIÓN
// =========================

renderTasks();
