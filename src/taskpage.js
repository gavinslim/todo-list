
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
            // Add to project
            addTaskToProject();

            input.value = '';
        }
    });

    return component;
}

function addTaskToProject() {
    const temp = document.querySelectorAll('.project');
    console.log(temp);
}

function loadTaskList() {
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');

    const projects = document.getElementsByClassName('project-list');
    // console.log(projects);
    return taskList;
}


export default initTaskpage;