import Task from './task.js';

function initTaskpage() {
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

function addTaskToProject() {
    const activeProject = document.querySelector('.active');
    const project = activeProject.querySelector('.project-name');
    const taskInput = document.querySelector('#new-task-input');
    const taskList = document.querySelector('.task-list');

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

function refreshTaskpage() {
    const activeProject = document.querySelector('.active');
    const project = activeProject.querySelector('.project-name');
    const taskList = document.querySelector('.task-list');
    const type = project.classList.contains('default') ? 'default' : 'projects';

    const projects = JSON.parse(localStorage.getItem(type)) || [];
    const index = projects.findIndex(storedProject => storedProject.name == project.innerHTML);

    taskList.innerHTML = projects[index].tasks.map(task => {
        return `
            <div class="task">
                <div class='task-description'>${task.description}</div>
                <div class='task-priority'>${task.priority}</div>
                <div class='task-dueDate'>${task.dueDate}</div>
            </div>
        `
    }).join('');
}

function loadTaskList() {
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');

    return taskList;
}


export default initTaskpage;