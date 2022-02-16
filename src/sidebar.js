import Project from './project.js';

// Load sidebar header
function loadSidebarHeader() {
    const sidebarHeader = document.createElement('div');
    sidebarHeader.setAttribute('id', 'sidebar-header');
    sidebarHeader.classList.add('disable-select');
    sidebarHeader.innerHTML = 'Projects';

    return sidebarHeader;
}

// Load default task project
function loadDefaultProjects() {
    const defaultList = document.createElement('div');
    defaultList.classList.add('default-list');
    
    addDefaultProject(defaultList, 'Important', 'far fa-star');
    addDefaultProject(defaultList, 'Tasks', 'fas fa-home', true);

    defaultList.addEventListener('click', (e) => {
        activateProject(e);
    });

    return defaultList;
}

function addDefaultProject(defaultList, name, icon, activate = false) {
    
    const projectContents = JSON.parse(localStorage.getItem(name)) || [];
    if (projectContents.length === 0) {
        const project = Project(name);
        projectContents.push(project.toJSON());   
        localStorage.setItem(name, JSON.stringify(projectContents));
    } 

    const classList = activate == true ? "default-project active" : "default-project"; 

    defaultList.innerHTML += `
        <div class="${classList}">
            <i class="${icon} project-icon"></i>
            <div class="project-name">${name}</div>
        </div>
        `;     
}

// Load sidebar project list 
function loadProjectList() {
    const projectList = document.createElement('div');
    projectList.classList.add('project-list');
    projectList.addEventListener('click', (e) => {
        if (e.target.classList.contains('project')) activateProject(e);
        if (e.target.matches('i')) modifyProject(e);
    });

    // for (var i = 0; i < localStorage.length; i++) {
    //     console.log(localStorage.key(i));
    // }

    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    populateProjList(projects, projectList);

    return projectList;
}

// Highlight project when clicked
function activateProject(e) {
    if (e.target.classList.contains('active')) return;

    // Remove active class
    removeActiveClass('default-project');
    removeActiveClass('project');

    // Populate taskpage
    populateTaskpage(e);

    e.target.classList.add('active');
}

function populateTaskpage(e) {
    const projectName = e.target.querySelector('.project-name').innerHTML;
    const projectContents = JSON.parse(localStorage.getItem(projectName)) || [];
    const taskList = document.querySelector('.task-list');

    populateTaskList(projectContents, taskList);
}

function populateTaskList(projectContents, taskList) {
    console.log(projectContents);
    // const temps = projectContents[0].tasks;
    // console.log(temps);
    // taskList.innerHTML = temps.map(task => {
    //     return `
    //         <div class="task">
    //             <div class='task-description'>${task.description}</div>
    //             <div class='task-priority'>${task.priority}</div>
    //             <div class='task-dueDate'>${task.dueDate}</div>
    //         </div>
    //     `
    // }).join('');
}

// Remove active class from selector
function removeActiveClass(selector) {
    const projects = document.querySelectorAll(`.${selector}`);
    projects.forEach(project => {
        if (project !== this) {
            project.classList.remove('active');
        }
    });
}

function modifyProject(e) {
    const projectList = e.currentTarget;
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const classList = e.target.classList;

    const selectedProject = e.target.parentNode.parentNode;
    const index = selectedProject.dataset.index;  

    // Delete project
    if (classList.contains('delete-icon')) {
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Edit project
    if (classList.contains('edit-icon')) {

    }

    // Populate project-list 
    populateProjList(projects, projectList);

}

// Load new project component
function loadNewProjComponent() {

    const newProjComponent = document.createElement('div');
    newProjComponent.setAttribute('id', 'new-proj-comp');

    newProjComponent.appendChild(loadNewProjSubComponent());
    newProjComponent.appendChild(loadNewProjBtn());

    return newProjComponent;
}

// Load component containing input and plus icon
function loadNewProjSubComponent() {
    const newProjSubComp = document.createElement('div');
    newProjSubComp.setAttribute('id', 'new-proj-sub-comp');
    newProjSubComp.classList.add('sidebar-btn');

    // Plus icon
    const addIcon = document.createElement('i');
    addIcon.classList.add('fas', 'fa-plus', 'sidebar-icon');
    newProjSubComp.appendChild(addIcon);

    // Input for new project name 
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'new-proj-sub-comp-input';
    input.name = 'new-proj-sub-comp-input';
    input.autocomplete = 'off';
    input.placeholder = 'New Project';
    newProjSubComp.appendChild(input);

    newProjSubComp.addEventListener('click', (e) => {
        document.getElementById('new-proj-sub-comp-input').focus();
    });

    // Check for 'enter' key pressed when sidebar-input is focused
    window.addEventListener('keydown', (e) => {
        const sidebarIsActive = document.querySelector('#new-proj-sub-comp-input');
        if (sidebarIsActive !== document.activeElement) {
            return;
        } else {
            if (e.key != 'Enter') {return;}
            addProjectToStorage();
            input.value = '';
        }
    });
    
    return newProjSubComp;
}

// Submit new project button
function loadNewProjBtn() {
    const newProjBtn = document.createElement('i');
    newProjBtn.classList.add('fas', 'fa-folder-plus');
    newProjBtn.setAttribute('id', 'new-proj-btn');

    newProjBtn.addEventListener('click', addProjectToStorage);
    return newProjBtn;
}

// Add new project to database
function addProjectToStorage() {
    var projectName = document.getElementById('new-proj-sub-comp-input').value;
    var projectList = document.querySelector('.project-list');
    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    if (projectName == '') projectName = 'Untitled';
    
    const newProject = Project(projectName);
    projects.push(newProject.toJSON());
    populateProjList(projects, projectList);
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Populate project list
function populateProjList(projects = [], projectList) {
    projectList.innerHTML = projects.map((project, i) => {
        return `
            <div class='project' data-index="${i}">
                <div class='project-left'>
                    <i class='fas fa-list project-icon'></i>
                    <div class='project-name'>${project.name}</div>
                </div>
                <div class='project-right'>
                    <i class='fas fa-pencil-alt edit-icon'></i>
                    <i class='fas fa-trash-alt delete-icon'></i>
                </div>
            </div>
        `
    }).join('');
}

// Initialize sidebar
function initSidebar() {

    const sidebar = document.createElement('div');
    sidebar.setAttribute('id', 'sidebar');
    
    sidebar.appendChild(loadSidebarHeader());
    sidebar.appendChild(loadDefaultProjects());
    sidebar.appendChild(loadProjectList());
    sidebar.appendChild(loadNewProjComponent());

    return sidebar;
}

export default initSidebar;