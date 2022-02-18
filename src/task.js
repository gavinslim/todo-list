export default (description) => {
    var description = description;
    var dueDate = 'No Date';
    var isComplete = false;

    const getDescription = () => {
        console.log(description);
    };

    function getDueDate() {
        console.log(dueDate);
    };

    function toJSON() {
        return {description, dueDate, isComplete};
    };

    return {
        getDescription,
        getDueDate,
        toJSON,
    };
}