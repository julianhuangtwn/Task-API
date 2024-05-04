const service = require("../services/taskService")

/**
 * Retrieves all tasks of a specific user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array<Task>} List of Tasks of the User.
 */
const getAllTasks = (req, res) => {
  try {
    const allTasks = service.getAllTasks(req.user.id);
    if (allTasks.length === 0) {
      return res.status(404).send({status: "Error", message: "No tasks found"});
    } else {
      return res.send({status: "OK", data: allTasks}); 
    }
  } catch (err) {
    return res.status(err?.status || 500).send({status: "Error", error: err?.message || err}); //?status
  }
}

/**
 * Retrieves a specific Task of a user.
 * @param {Object} req - The request object containing taskID.
 * @param {Object} res - The response object.
 * @returns {Task} The matched Task of the User.
 */
const getTask = (req, res) => {
  try {
    //req.params matches the first param in the first position of the URL
    const task = service.getTask(req.params.taskID, req.user.id);
    return res.send({status: "OK", data: task});
  } catch (err) {
    return res.status(err?.status || 500).send({status: "Error", error: err?.message || err});
  }
}

/**
 * Creates a new Task for a specific user.
 * @param {Object} req - The request object containing the Task data.
 * @param {Object} res - The response object.
 * @returns {Task} The newly created Task.
 */
const createTask = (req, res) => {
  const requiredKeys = getRequiredKeys();
  const allStandardKeys = getAllStandardKeys();
  //Deconstructs request JSON 
  const {body, user} = req;

  let missingKey;
  //Loops requiredKeys and check if request is missing necessary fields
  //breaks loop early when found discrepancy
  const missingKeys = requiredKeys.some(key => {
    if (!body[key]){
      missingKey = key;
      return true;
    }
  });

  if (missingKeys) {
    return res.status(400).send({status: "error", message: `${getRequiredKeys()} fields are required.`});
  }

  const newTaskObj = {};
  allStandardKeys.forEach((key) => {
    if (body[key]) {
      newTaskObj[key] = body[key];
    }    
  });

  try{
    const newTask = service.createTask(newTaskObj, user.id);
    //201 - New resource was created from POST
    return res.status(201).send({status: "OK", data: newTask});
  } catch (err) {
    //If error contains status sends status, else 500
    //err?.message contains error message or else just the error
    return res.status(err?.status || 500).send({status: "Error", error: err?.message || err});
  }
}

/**
 * Edits a specific Task of a user.
 * @param {Object} req - The request object containing taskID and Task data.
 * @param {Object} res - The response object.
 * @returns {Task} The updated Task.
 */
const editTask = (req, res) => {
  const {params: {taskID}, body, user} = req;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({status: "Error", message: "body cannot be empty"});
  }
  try {
    const updatedTask = service.editTask(taskID, body, user.id);
    return res.send({status: "OK", data: updatedTask});
  } catch (err) {
    return res.status(err?.status || 500).send({status: "Error", error: err?.message || err});
  }
}

/**
 * Deletes a specific Task of a user.
 * @param {Object} req - The request object containing taskID.
 * @param {Object} res - The response object.
 * @returns {Task} The deleted Task.
 */
const deleteTask = (req, res) => {
  if (!req.params.taskID) {
    return res.status(400).send({status: "Error", message: "taskID is missing"});
  }
  try {
    const deletedTask = service.deleteTask(req.params.taskID, req.user.id);
    return res.send({status: "OK", data: deletedTask});
  } catch (err) {
    return res.status(err?.status || 500).send({status: "Error", error: err?.message || err});
  }
}

/**
 * Returns the required keys for a Task.
 * @returns {Array<string>} An array containing the required keys.
 */
function getRequiredKeys() {
  return ['title', 'description', 'dueDate', 'priority'];
}

/**
 * Returns all the keys for a Task.
 * @returns {Array<string>} An array containing all the standard keys.
 */
function getAllStandardKeys() {
  return [...getRequiredKeys(), 'notes', 'itemsNeeded'];
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  editTask,
  deleteTask,
};


