import initSidebar from './sidebar.js';
import {initTaskpage, refreshTaskpage} from './taskpage.js';

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

export default initWebpage;