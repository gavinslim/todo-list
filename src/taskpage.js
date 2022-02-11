
function initTaskpage() {
    const taskPage = document.createElement('div');
    taskPage.setAttribute('id', 'task-page');

    taskPage.appendChild(loadTaskHeader())
    taskPage.appendChild(loadTaskList());
    return taskPage;
}

function loadTaskHeader() {
    const taskHeader = document.createElement('div');
    taskHeader.setAttribute('id', 'task-header');
    taskHeader.textContent = 'Tasks';
    // var projectList = document.querySelector('.project-list');

    // projectList.forEach(project => {
    //     console.log(project);
    // });

    return taskHeader;
}

function loadTaskList() {
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');

    const projects = document.getElementsByClassName('project-list');
    console.log(projects);
    return taskList;
}

function populateTaskList(tasks = [], taskList) {

}

export default initTaskpage;