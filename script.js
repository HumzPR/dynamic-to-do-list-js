document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim task input value

        // Check if the task is not empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

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
        });

        // Append the Remove button to the task item and then append the task item to the task list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Clear the input field
        taskInput.value = "";
    }

    // Event listener for adding task when "Add Task" button is clicked
    addButton.addEventListener('click', addTask);

    // Allow adding a task by pressing Enter
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
