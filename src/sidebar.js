
// const newProjBtn = document.createElement('div');
// newProjBtn.classList.add('new-proj-btn');
// newProjBtn.innerHTML = 'New Project';
// sidebar.appendChild(newProjBtn);

function initSidebar() {

    const sidebar = document.createElement('div');
    sidebar.setAttribute('id', 'sidebar');


    const sidebar_header = document.createElement('div');
    sidebar_header.setAttribute('id', 'sidebar_header');
    sidebar_header.innerHTML = 'Projects';
    sidebar.appendChild(sidebar_header);

    return sidebar;
}

export default initSidebar;