const data = require("./data.json");

/**
 * Retrieves the logs associated with a specific task for a given taskID and userID.
 *
 * @param {string} taskID - The ID(UUID) of the task
 * @param {string} userID - The ID(UUID) of the user associated with the task
 * @return {Array<Log>} An array of Logs related to the specified task
 */
const getTaskLog = (taskID, userID) => {
    try{
        //Either user has to own a past deleted task or a current task
        if ((data.pastTasks.find(task => task.userID === userID && task.taskID === taskID)) 
        || (data.tasks.find(task => task.userID === userID && task.id === taskID))) {
            //Filter logs based on taskID
            const matchedLogs = data.logs.filter(log => log.taskID === taskID);
            if (matchedLogs.length === 0) {
                throw {"status": 404, "message": `No logs found`}
            }
            return matchedLogs;
        } else {
            throw {"status": 404, "message": `Task ID: ${taskID} not found`}
        }
    } catch (err) {
        throw {"status": err?.status || 500, "message": err?.message || err};
    }
}

/**
 * Creates a new log entry for creating a task.
 *
 * @param {Task} newTask - The task object to create a log entry for.
 */
const newLog_createTask = (newTask) => {
    const log = {
        taskID: newTask.id,
        timestamp: new Date().toLocaleString(),
        action: `Task '${newTask.title}' created.`
    }

    //Add log to database
    data.logs.push(log);
}

/**
 * Creates a new log entry for editing a task.
 *
 * @param {string} title - The title of the task to be updated.
 * @param {string} taskID - The ID(UUID) of the task to be updated.
 * @param {Object} updates - An object containing the updates to be applied to the task.
 */
const newLog_editTask = (task, updates) => {
    //Each update within updates will be in the form of [key -> value]
    const updateStrings = Object.entries(updates).map(([key, value]) => `[${task[key]} -> ${value}]`);
    //Joins the updateStrings array to create a single string separated by comma
    const action = `Task '${task.title}' updated: ` + updateStrings.join(', ');

    const log = {
        taskID: task.id,
        timestamp: new Date().toLocaleString(),
        action: action
    }

    //Add log to database
    data.logs.push(log);
}

/**
 * Generate a new log entry for deleting a task.
 *
 * @param {string} title - The title of the task being deleted.
 * @param {string} taskID - The ID(UUID) of the task being deleted.
 */
const newLog_deleteTask = (title, taskID) => {
    const log = {
        taskID: taskID,
        timestamp: new Date().toLocaleString(),
        action: `Task '${title}' deleted.`
    }

    //Add log to database
    data.logs.push(log);
}

module.exports = {
    getTaskLog,
    newLog_createTask,
    newLog_editTask,
    newLog_deleteTask
}