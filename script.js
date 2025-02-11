document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", function (event) {
        event.stopPropagation();
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.innerText.replace("Delete", "").trim(), completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;
        
        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function () {
            li.classList.toggle("completed");
            saveTasks();
        });

        li.querySelector(".delete-btn").addEventListener("click", function (event) {
            event.stopPropagation();
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
    });
}
