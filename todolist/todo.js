// Load tasks from LocalStorage when the page opens
document.addEventListener('DOMContentLoaded', getTasks);

function addTask() {
    const input = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (input.value.trim() === "") return;

    // Create the task object
    const taskObj = {
        text: input.value,
        completed: false
    };

    // Save to LocalStorage
    saveLocalTask(taskObj);

    // Render the task on the screen
    renderTask(taskObj);

    input.value = "";
}

// Function to render a task to the UI
function renderTask(taskObj) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    // Updated the delete span to look like a "Remove" button
    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" ${taskObj.completed ? 'checked' : ''} onchange="toggleTask(this)">
            <span class="${taskObj.completed ? 'completed' : ''}">${taskObj.text}</span>
        </div>
        <button class="remove-btn" onclick="deleteTask(this)">Remove</button>
    `;

// (Keep all other functions like getTasks, saveLocalTask, and toggleTask the same)

    taskList.appendChild(li);
}

function toggleTask(checkbox) {
    const taskText = checkbox.nextElementSibling;
    const allTasks = JSON.parse(localStorage.getItem("tasks"));
    
    // Update the visual look
    if (checkbox.checked) {
        taskText.classList.add('completed');
    } else {
        taskText.classList.remove('completed');
    }

    // Update the data in LocalStorage
    const updatedTasks = allTasks.map(t => {
        if (t.text === taskText.innerText) {
            t.completed = checkbox.checked;
        }
        return t;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
// Ensure the deleteTask function still works with the new button
function deleteTask(element) {
    const taskText = element.parentElement.querySelector('span').innerText;
    element.parentElement.remove();

    // Remove from LocalStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// (Keep all other functions like getTasks, saveLocalTask, and toggleTask the same)
// --- LOCAL STORAGE LOGIC ---

function saveLocalTask(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(task => renderTask(task));
}

// Support Enter Key
document.getElementById("taskInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});