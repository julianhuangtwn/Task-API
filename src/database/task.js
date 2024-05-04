const data = require("./data.json");
const { saveToDatabase } = require("./utils");
const log = require("./log");

/**
 * Retrieves all tasks for a User.
 *
 * @param {string} userID - The ID(UUID) of the User
 * @return {Array<Task>} A list of Tasks of the User 
 */
const getAllTasks = (userID) => {
    try {
        const allTasks = data.tasks.filter(task => task.userID === userID);
        return allTasks;
    } catch (err) {
        throw {status: 500, message: err};
    }
}

/**
 * Retrieves a specific task for a User.
 *
 * @param {string} taskID - The ID(UUID) of the task
 * @param {string} userID - The ID(UUID) of the user
 * @return {Task} The matched Task of the User 
 */
const getTask = (taskID, userID) => {
    try {
        const matchedTask = getAllTasks(userID).filter(task => task.id === taskID);
        if (matchedTask.length === 0) {
            throw {status: 404, message: `Task: ${taskID} not found.`};
        } else {
            return matchedTask[0];
        }
    } catch (err) {
        throw { status: err?.status || 500, message: err?.message || err };
    }
}

/**
 * Creates a new task for a User.
 *
 * @param {Task} newTask - The Task object to create
 * @return {Task} The newly created Task object
 */
const createTask = (newTask) => {
    getAllTasks(newTask.userID).forEach((task) => {
        if (task.title.toLowerCase() === newTask.title.toLowerCase()){
            throw {status: 400, message: `Task ${newTask.title} already exists.`};
        }
    });
    data.tasks.push(newTask);
    
    log.newLog_createTask(newTask);

    try{
        saveToDatabase(data);
        return newTask;
    } catch (err) {
        throw {status: 500, message: err?.message || err};
    }
}

/**
 * Edits a task for a given user.
 *
 * @param {string} taskID - The ID(UUID) of the task to edit
 * @param {Object} updates - The updates to apply to the task
 * @param {string} userID - The ID(UUID) of the User
 * @return {Task} The edited Task object
 */
const editTask = (taskID, updates, userID) => {
    const task = getTask(taskID, userID);
    const updatedTask = {
        ...task,
        ...updates,
        updatedAt: new Date().toLocaleString()
    }

    log.newLog_editTask(task, updates);
    const taskIndex = data.tasks.findIndex(task => task.id === taskID);
    data.tasks[taskIndex] = updatedTask;

    try{
        saveToDatabase(data);
        return updatedTask;
    } catch (err) {
        throw {status: 500, message: err?.message || err};
    }
}

/**
 * Deletes a task for a given user.
 *
 * @param {string} taskID - The ID(UUID) of the task to delete
 * @param {string} userID - The ID(UUID) of the User
 * @return {Task} The deleted Task object
 */
const deleteTask = (taskID, userID) => {
    const deletedTask = getTask(taskID, userID);
    const taskIndex = data.tasks.findIndex(task => task.id === taskID);
    //splice removes elements from an array from taskIndex and number of elements to remove
    data.tasks.splice(taskIndex, 1);

    const pastTask = {
        "userID": userID,
        "taskID": taskID,
    }

    data.pastTasks.push(pastTask);

    log.newLog_deleteTask(deletedTask.title, taskID);

    try{
        saveToDatabase(data);
        return deletedTask;
    } catch (err) {
        throw {status: 500, message: err?.message || err};
    }
}
 
module.exports = {
    getAllTasks,
    getTask,
    createTask,
    editTask,
    deleteTask
}

