
const content = document.getElementById('content');

// Initialize header
function initializeHeader() {
    const header = document.createElement('div');
    header.setAttribute('id', 'header');

    const logo = document.createElement('i');
    logo.classList.add('fas', 'fa-list-ul');
    header.appendChild(logo);

    const title = document.createElement('div');
    title.innerHTML = 'To-Do';
    header.appendChild(title);

    content.appendChild(header);
}

// Initialize main
function initializeMain() {
    const main = document.createElement('div');
    main.setAttribute('id', 'main');

    const sidebar = document.createElement('div');
    sidebar.setAttribute('id', 'sidebar');
    main.appendChild(sidebar);

    const mainPage = document.createElement('div');
    mainPage.setAttribute('id', 'main-page');
    main.appendChild(mainPage);

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

function initializeWebpage() {
    initializeHeader();
    initializeMain();
    initializeFooter();
}

export default initializeWebpage;