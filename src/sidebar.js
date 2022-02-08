// Load sidebar header
function loadSidebarHeader() {
    const sidebarHeader = document.createElement('div');
    sidebarHeader.setAttribute('id', 'sidebar_header');
    sidebarHeader.classList.add('disable-select');
    sidebarHeader.innerHTML = 'Projects';
    return sidebarHeader;
}

// Load sidebar project list 
function loadSidebarList() {
    const sidebarList = document.createElement('div');
    sidebarList.classList.add('sidebar-list');
    sidebarList.appendChild(loadNewProjComponent());
    return sidebarList;
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
    const projectName = document.getElementById('new-proj-sub-comp-input').value;
    
    if (projectName == '') {
        console.log('Untitled');
    } else {
        console.log(projectName);
    }
}

// Initialize sidebar
function initSidebar() {

    const sidebar = document.createElement('div');
    sidebar.setAttribute('id', 'sidebar');
    
    sidebar.appendChild(loadSidebarHeader());
    sidebar.appendChild(loadSidebarList());

    return sidebar;
}

export default initSidebar;