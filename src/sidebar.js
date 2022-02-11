import Task from './task.js';

// Load sidebar header
function loadSidebarHeader() {
    const sidebarHeader = document.createElement('div');
    sidebarHeader.setAttribute('id', 'sidebar_header');
    sidebarHeader.classList.add('disable-select');
    sidebarHeader.innerHTML = 'Projects';
    return sidebarHeader;
}

// Load sidebar project list 
function loadProjectList() {
    const sidebarList = document.createElement('div');
    sidebarList.classList.add('project-list');
    sidebarList.addEventListener('click', (e) => {
        if (e.target.classList.contains('project')) activateProject(e);
        if (e.target.matches('i')) modifyProject(e);
    });

    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    populateProjList(projects, sidebarList);

    return sidebarList;
}

// Highlight project when clicked
function activateProject(e) {
    if (e.target.classList.contains('active')) return;

    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        if (project !== this) {
            project.classList.remove('active');
        }
    });

    e.target.classList.add('active');
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

    if (projectName == '') {
        projectName = 'Untitled';
    }
    
    projects.push(projectName);
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
                    <div class='project-name'>${project}</div>
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
    sidebar.appendChild(loadProjectList());
    sidebar.appendChild(loadNewProjComponent());

    return sidebar;
}

export default initSidebar;