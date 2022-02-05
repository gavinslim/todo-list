// Sidebar header
function addHeader() {
    const sidebarHeader = document.createElement('div');
    sidebarHeader.setAttribute('id', 'sidebar_header');
    sidebarHeader.innerHTML = 'Projects';
    return sidebarHeader;
}

// New Project button
function addNewProjBtn() {
    const newProjBtn = document.createElement('div');
    newProjBtn.classList.add('new-proj-btn', 'sidebar-btn');

    const addIcon = document.createElement('i');
    addIcon.classList.add('fas', 'fa-plus', 'sidebar-icon');
    newProjBtn.appendChild(addIcon);

    const content = document.createElement('div');
    content.textContent = 'New Project';
    newProjBtn.appendChild(content);

    return newProjBtn;
}

function initSidebar() {

    const sidebar = document.createElement('div');
    sidebar.setAttribute('id', 'sidebar');
    
    sidebar.appendChild(addHeader());
    sidebar.appendChild(addNewProjBtn());

    return sidebar;
}

export default initSidebar;