export default (description) => {
    var description = description;
    var priority = 0;
    var dueDate = 123;
    var isComplete = false;

    const getDescription = () => {
        console.log(description);
    };

    const getPriority = () => {
        console.log(priority);
    };

    // const getDueDate = () => {

    // }

    function getDueDate() {
        console.log(dueDate);
    }

    return {
        getDescription,
        getPriority,
        getDueDate,
    };
}