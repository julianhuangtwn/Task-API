const Schedule = require("../database/task");
const { v4: uuidv4 } = require("uuid");

/**
 * Retrieves all tasks for a given user.
 *
 * @param {string} userID - The ID(UUID) of the user.
 * @return {Array<Task>} - A list of Task objects.
 */
function getAllTasks(userID) {
    try {
        return Schedule.getAllTasks(userID);
    } catch (err) {
        throw err;
    }
}

/**
 * Retrieves a Task for a user.
 *
 * @param {string} taskID - The ID(UUID) of the task.
 * @param {string} userID - The ID(UUID) of the user.
 * @return {Task} - The Task object.
 */
function getTask(taskID, userID) {
    try {
        return Schedule.getTask(taskID, userID);
    } catch (err) {
        throw err;
    }
}

/**
 * Creates a new task for a given user.
 *
 * @param {Object} newTask - The task object to create.
 * @param {string} userID - The ID(UUID) of the user.
 * @return {Task} - The created Task object.
 */
function createTask(newTask, userID) {
    const updatedNewTask = {
        ...newTask,
        id: uuidv4(),
        userID: userID,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
    };
    try {
        return Schedule.createTask(updatedNewTask);
    } catch (err) {
        throw err;
    }
}

/**
 * Edits a specific task for a given user.
 *
 * @param {string} taskID - The ID(UUID) of the task.
 * @param {Object} updates - The updates to apply to the task.
 * @param {string} userID - The ID(UUID) of the user.
 * @return {Task} - The edited Task object.
 */
function editTask(taskID, updates, userID) {
    try {
        return Schedule.editTask(taskID, updates, userID);
    } catch (err) {
        throw err;
    }
}

/**
 * Deletes a specific task for a given user.
 *
 * @param {string} taskID - The ID(UUID) of the task.
 * @param {string} userID - The ID(UUID) of the user.
 * @return {Task} - The deleted Task object.
 */
function deleteTask(taskID, userID) {
    try {
        return Schedule.deleteTask(taskID, userID);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    editTask,
    deleteTask
};

