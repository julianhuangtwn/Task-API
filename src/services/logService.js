const Log = require("../database/log");

/**
 * Retrieves the task Log for a specific task. 
 *
 * @param {string} taskID - The ID(UUID) of the task
 * @param {string} userID - The ID(UUID) of the user
 * @return {Log} The matched task Log
 */
const getTaskLog = (taskID, userID) => {
    try {
        const matchedLog = Log.getTaskLog(taskID, userID);
        return matchedLog;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getTaskLog
}