document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents saving again
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (taskText === "") return;

        // Create a new <li> element for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a Remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        
        // Attach an event listener to the Remove button to delete the task
        removeButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            removeTaskFromLocalStorage(taskText); // Remove from Local Storage
        });

        // Append the Remove button to the task item and then append the task item to the task list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Save the new task to Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Filter out the removed task
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save the updated array to Local Storage
    }

    // Event listener for adding task when "Add Task" button is clicked
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText);
        taskInput.value = ""; // Clear input field
    });

    // Allow adding a task by pressing Enter
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
            taskInput.value = ""; // Clear input field
        }
    });

    // Load tasks when the page is loaded
    loadTasks();
});
