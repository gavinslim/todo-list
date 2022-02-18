import initSidebar from './sidebar.js';
import initTaskpage from './taskpage.js';

// Initialize header
function initHeader() {
    const header = document.createElement('div');
    header.setAttribute('id', 'header');

    // Logo and title
    const leftHeader = document.createElement('div');
    leftHeader.setAttribute('id', 'left-header');

    const logo = document.createElement('i');
    logo.classList.add('fas', 'fa-clipboard-list');
    leftHeader.appendChild(logo);

    const title = document.createElement('div');
    title.innerHTML = 'To-Do';
    title.classList.add('disable-select');
    leftHeader.appendChild(title);
    header.appendChild(leftHeader);

    // Github link
    const github = document.createElement('div');
    github.setAttribute('id', 'github');

    const link = document.createElement('a');
    link.href = 'https://github.com/gavinslim';
    link.target = '_blank';
    
    const icon = document.createElement('i');
    icon.classList.add('fab', 'fa-github');

    link.appendChild(icon);
    github.appendChild(link);
    header.appendChild(github);    

    content.appendChild(header);
}

// Initialize main
function initMain() {
    const main = document.createElement('div');
    main.setAttribute('id', 'main');

    main.appendChild(initSidebar());
    main.appendChild(initTaskpage());

    content.appendChild(main);
}

// Initialize footer
function initializeFooter() {
    const footer = document.createElement('div');
    footer.setAttribute('id', 'footer');

    const copyright = document.createElement('div');
    copyright.innerHTML = 'Copyright © 2021 Gavin Lim';
    footer.appendChild(copyright);

    const github = document.createElement('div');
    github.setAttribute('id', 'github');

    const link = document.createElement('a');
    link.href = 'https://github.com/gavinslim';
    link.target = '_blank';
    
    const icon = document.createElement('i');
    icon.classList.add('fab', 'fa-github');
    link.appendChild(icon);
    github.appendChild(link);
    footer.appendChild(github);

    content.appendChild(footer);
}

function initWebpage() {
    initHeader();
    initMain();
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
        const taskClass = task.dueDate == 'No Date' ? 'task-dueDate active' : 'task-dueDate';

        return `
            <div class="task">
                <i class="far fa-circle circle-icon"></i>
                <div class='task-description'>${task.description}</div>
                <div class='${taskClass}'>${task.dueDate}</div>
                <input type="date" class="input-date">
                <i class='fas fa-trash-alt delete-icon'></i>
            </div>
        `
    }).join('');
}

export default initWebpage;