// const projectList = document.querySelector('.project-list');
// const projects = JSON.parse(localStorage.getItem('projects')) || [];

const Task = (name) => {
    let info = {
        name,
        priority: 0,
        deadline: 0,
        status: 'Not Started'
    }

    const getName = () => {console.log('Task name is ' + info.name)};
    return {getName}
}

const Project = (name) => {
    let name = name;
    let taskList = [];

    const getName = () => {return name;}

    const addTask = (taskName) => {
        const newTask = Task(taskName);
        taskList.push(newTask);
    }

    return {getName, addTask}
}

function populateProjList(projects = [], projectList) {
    // projectList.innerHTML = projects.map((project, i) => {
    //     return `
    //         <div>${project.name}</div>
    //     `
    // }).join('');
}

function foo() {
    console.log('foo');
}

export default foo;