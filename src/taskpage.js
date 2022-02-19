import Task from './task.js';

export function initTaskpage() {
    const taskPage = document.createElement('div');
    taskPage.setAttribute('id', 'task-page');

    taskPage.appendChild(loadTaskHeader());
    taskPage.appendChild(loadNewTaskComponent());
    taskPage.appendChild(loadTaskList());

    return taskPage;
}

function loadTaskHeader() {
    const taskHeader = document.createElement('div');
    taskHeader.setAttribute('id', 'task-header');
    taskHeader.classList.add('disable-select');
    taskHeader.innerHTML = 'Tasks';
    return taskHeader;
}

// Load new task component
function loadNewTaskComponent() {
    const component = document.createElement('div');
    component.setAttribute('id', 'new-task-component');

    const plusIcon = document.createElement('i');
    plusIcon.classList.add('fas', 'fa-plus', 'plus-icon');
    component.appendChild(plusIcon);

    // Input for new project name 
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'new-task-input';
    input.name = 'new-task-input';
    input.autocomplete = 'off';
    input.placeholder = 'Add a task';
    component.appendChild(input);

    component.addEventListener('click', (e) => {
        document.getElementById('new-task-input').focus();
    });

    // Check for 'enter' key pressed when sidebar-input is focused
    window.addEventListener('keydown', (e) => {
        const newTaskInput = document.querySelector('#new-task-input');
        if (newTaskInput !== document.activeElement) {
            return;
        } else {
            if (e.key != 'Enter') {return;}
            addTaskToProject();
            input.value = '';
        }
    });

    return component;
}

function loadTaskList() {
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');

    // Add click feature
    taskList.addEventListener('click', (e) => {
        if (e.target.matches('i')) deleteTask(e);
        if (e.target.matches('input') || e.target.classList.contains('task-dueDate')) setDueDate(e);
    });

    return taskList;
}

function addTaskToProject() {
    const activeProject = document.querySelector('.active');
    const project = activeProject.querySelector('.project-name');
    const taskInput = document.querySelector('#new-task-input');

    // Create task object
    if (taskInput == '') return;
    const task = Task(taskInput.value);

    // Check with type of project 
    const type = project.classList.contains('default') ? 'default' : 'projects';

    // Retrieve project from localStorage and save task to project
    const projects = JSON.parse(localStorage.getItem(type)) || [];
    const index = projects.findIndex(storedProject => storedProject.name == project.innerHTML);
    projects[index].tasks.push(task.toJSON());

    // Update project in localStorage
    localStorage.setItem(type, JSON.stringify(projects));

    // Update taskpage
    refreshTaskpage();
}

export function refreshTaskpage() {
    const activeProject = document.querySelector('.active');
    const project = activeProject.querySelector('.project-name');
    const taskList = document.querySelector('.task-list');
    const type = project.classList.contains('default') ? 'default' : 'projects';

    const projects = JSON.parse(localStorage.getItem(type)) || [];
    const index = projects.findIndex(storedProject => storedProject.name == project.innerHTML);

    // // Add onChange function to input date    
    taskList.innerHTML = projects[index].tasks.map(task => {
        return `
            <div class="task">
                <i class="far fa-circle circle-icon"></i>
                <div class='task-description'>${task.description}</div>
                <div class='task-dueDate active'>${task.dueDate}</div>
                <input type="date" class="input-date" name="date">
                <i class='fas fa-trash-alt delete-icon'></i>
            </div>
        `
    }).join('');
}

function deleteTask(e) {
    const task = e.target.parentNode;
    const taskName = task.querySelector('.task-description').innerHTML;

    const project = document.querySelector('.active');
    const projectSub = project.querySelector('.project-name');
    const projectName = projectSub.innerHTML;
    const type = projectSub.classList.contains('default') ? 'default' : 'projects';

    // Grab project from LocalStorage
    const projects = JSON.parse(localStorage.getItem(type)) || [];
    const projectContents = projects.find(project => project.name == projectName);
    const projectIndex = projects.findIndex(project => project.name == projectName);
    const taskIndex = projectContents.tasks.findIndex(content => content.description == taskName)

    // Delete task in project 
    projectContents.tasks.splice(taskIndex, 1);

    // Update project in localStorage
    projects.splice(projectIndex, 1, projectContents)
    localStorage.setItem(type, JSON.stringify(projects));

    refreshTaskpage();
}

// Update task due date in localStorage
function changeDueDateStorage(task, dueDate) {
    const taskName = task.querySelector('.task-description').innerHTML;

    // Check if default or user-input project
    const project = document.querySelector('.active');
    const projectSub = project.querySelector('.project-name');
    const projectName = projectSub.innerHTML;
    const type = projectSub.classList.contains('default') ? 'default' : 'projects';

    // Grab project from LocalStorage
    const projects = JSON.parse(localStorage.getItem(type)) || [];
    const projectContents = projects.find(project => project.name == projectName);
    const projectIndex = projects.findIndex(project => project.name == projectName);
    const taskIndex = projectContents.tasks.findIndex(content => content.description == taskName)
    
    // Set due date
    projectContents.tasks[taskIndex].dueDate = dueDate;
    projects.splice(projectIndex, 1, projectContents)
    localStorage.setItem(type, JSON.stringify(projects));
}

// Set task due date
function setDueDate(e) {
    const taskContainer = e.target.parentNode;
    const dueDate = taskContainer.querySelector('.task-dueDate');
    const inputDate = taskContainer.querySelector('.input-date');

    if (e.target.matches('input')) {
        // Add onChange function to input date    
        const dateInputs = document.querySelectorAll('.input-date');
        dateInputs.forEach(dateInput => {
            dateInput.addEventListener('change', (e) => {
                const task = e.target.parentNode;

                // Save new due date
                dueDate.innerHTML = e.target.value == '' ? 'No Date': e.target.value;
                changeDueDateStorage(task, dueDate.innerHTML);

                dueDate.classList.add('active');
                inputDate.classList.remove('active');
            });
        });

    } else {
        dueDate.classList.remove('active');
        inputDate.classList.add('active');
    }
}