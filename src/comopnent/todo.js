$(document).ready(function () {

    // Function to load tasks from local storage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Clear the current table body
        $('#todo-list tbody').empty();

        // Display tasks in the table
        tasks.forEach(function(task, index) {
            let taskRow = `<tr data-id="${index}" class="${task.completed ? 'completed' : ''}">
                            <td>${index + 1}</td>
                            <td class="task-text">${task.task}</td>
                            <td>${task.dueDate}</td>
                            <td>
                                <button class="edit-task">Edit</button>
                                <button class="delete-task">Delete</button>
                            </td>
                          </tr>`;
            $('#todo-list tbody').append(taskRow);
        });
    }

    // Function to save tasks to local storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function formatDate(date) {
        let d = new Date(date);
        let day = String(d.getDate()).padStart(2, '0');
        let month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        let year = d.getFullYear();
        return day + '-' + month + '-' + year;
    }

    // Add new task
    $('#add-task').click(function () {
        let newTask = $('#new-task').val();
        let dueDate = $('#due-date').val();
        if (newTask !== '' && dueDate !== '') {
            // Format the due date to dd-MM-YYYY
            let formattedDate = formatDate(dueDate);
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

            // Add the new task
            tasks.push({ task: newTask, dueDate: formattedDate, completed: false });
            saveTasks(tasks);

            // Reload tasks to reflect the new task
            loadTasks();

            // Clear the input fields
            $('#new-task').val('');
            $('#due-date').val('');
        }
    });

    // Edit task
    $('#todo-list').on('click', '.edit-task', function () {
        let taskId = $(this).closest('tr').data('id');
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let currentTaskText = tasks[taskId].task;
        let currentDueDate = tasks[taskId].dueDate;

        // Prompt the user to edit the task
        let newTaskText = prompt('Edit task:', currentTaskText);
        let newDueDate = prompt('Edit due date (dd-MM-YYYY):', currentDueDate);

        if (newTaskText !== null && newTaskText.trim() !== '' && newDueDate !== null) {
            tasks[taskId].task = newTaskText.trim();
            tasks[taskId].dueDate = newDueDate; // Assume user enters in correct format

            // Save the updated tasks to local storage
            saveTasks(tasks);

            // Reload tasks to reflect the change
            loadTasks();
        }
    });

    // Delete task
    $('#todo-list').on('click', '.delete-task', function () {
        let taskId = $(this).closest('tr').data('id');
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(taskId, 1);
        saveTasks(tasks);

        // Reload tasks to reflect the change
        loadTasks();
    });

    // Load tasks when the page is loaded
    loadTasks();
});
