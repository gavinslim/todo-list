export default (name) => {
    var name = name;
    var tasks = [];

    function getName() {
        return name;
    }

    function addTask(task) {
        tasks.push(task);
    }

    function removeTask(task) {
        tasks.find(name);
    }

    // Required method for adding private variables to localStorage
    function toJSON() {
        return {name, tasks};
    }

    return {
        getName,
        addTask,
        removeTask,
        toJSON,
    };
}