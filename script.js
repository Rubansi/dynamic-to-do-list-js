// Listen for the DOMContentLoaded event to ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and populate the list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't save again
    }

    // Function to add a new task to the list and optionally save to Local Storage
    function addTask(taskText, save = true) {
        // If called from button/Enter, get value from input
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item'); // Add a class for styling or identification

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // Use classList.add instead of className

        // Assign an event to remove the task when clicked
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the input field if added via input
        if (save) {
            taskInput.value = "";
        }

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Event listener for pressing "Enter" in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});