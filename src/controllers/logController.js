const Service = require("../services/logService");

/**
 * Retrieves the task log for a specific task and user. 
 * 
 * @param {Object} req - The request object containing taskID(UUID)
 * @param {Object} res - The response object
 * @returns {Log} Matched Log of the User
 */
const getTaskLog = (req, res) => {
    if (!req.params.taskID) {
        return res.status(400).send({status: "Error", message: "taskID is missing"});
    }
    try { 
        const matchedLog = Service.getTaskLog(req.params.taskID, req.user.id);
        return res.send({status: "OK", data: matchedLog});
    } catch (err) {
        return res.status(err?.status || 500).send({status: "Error", error: err?.message || err});
    }
};

module.exports = {
    getTaskLog
}