// Select elements
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskButton');
const taskFormContainer = document.getElementById('taskFormContainer');
const closeTaskForm = document.getElementById('closeTaskForm');
const taskForm = document.getElementById('taskForm');

let tasks = []; // Task list
let editingIndex = null; // Track the index of the task being edited (null for new tasks)

// Helper to create an element with text and optional class
function createElement(tag, text, className) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
}

// Helper to toggle element visibility
function toggleVisibility(element, visible) {
    element.classList.toggle('hidden', !visible);
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear the list
    tasks.forEach((task, index) => {
        const listItem = createElement('li', null, 'taskItem');
        listItem.appendChild(createElement('h3', task.name));
        listItem.appendChild(createElement('p', task.desc));
        listItem.appendChild(createElement('small', `Due: ${task.due || "No due date"}`));

        const buttonContainer = createElement('div', null, 'button-container');
        const editButton = createElement('button', 'Edit', 'edit-button');
        editButton.addEventListener('click', () => editTask(index));
        const deleteButton = createElement('button', 'Delete', 'delete-button');
        deleteButton.addEventListener('click', () => deleteTask(index));

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        listItem.appendChild(buttonContainer);
        taskList.appendChild(listItem);
    });
}

// Function to handle editing a task
function editTask(index) {
    const task = tasks[index];
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDesc').value = task.desc;
    document.getElementById('taskDue').value = task.due;
    editingIndex = index;
    toggleVisibility(taskFormContainer, true);
}

// Function to handle form submission
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = {
        name: document.getElementById('taskName').value,
        desc: document.getElementById('taskDesc').value,
        due: document.getElementById('taskDue').value,
    };
    if (editingIndex !== null) {
        tasks[editingIndex] = task; // Update existing task
    } else {
        tasks.push(task); // Add new task
    }
    editingIndex = null;
    taskForm.reset();
    toggleVisibility(taskFormContainer, false);
    renderTasks();
    await saveTasks();
});

// Function to delete a task
function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1); // Remove task
        renderTasks();
        saveTasks();
    }
}

// Function to save tasks to the backend
async function saveTasks() {
    try {
        const response = await fetch('/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ todos: tasks }),
        });
        if (!response.ok) throw new Error(`Failed to save tasks: ${response.statusText}`);
    } catch (error) {
        console.error("Error saving tasks:", error);
    }
}

// Function to load tasks from the backend
async function loadTasks() {
    try {
        const response = await fetch('/todos');
        if (response.ok) {
            tasks = await response.json();
            renderTasks();
        } else {
            console.error('Failed to load tasks:', response.status);
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Event handlers
closeTaskForm.addEventListener('click', () => {
    editingIndex = null;
    taskForm.reset();
    toggleVisibility(taskFormContainer, false);
});

addTaskButton.addEventListener('click', () => {
    editingIndex = null;
    taskForm.reset();
    toggleVisibility(taskFormContainer, true);
});

// Load tasks and render them on page load
loadTasks();
