const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController")
const logController = require("../../controllers/logController")
const {authenticateToken} = require("../../middleware/authMiddle")

/*
# means root
application/json means we are sending json
*/

/**
 * @openapi
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks for a user
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskReturn'  
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'           
 *       '404':
 *         $ref: '#/components/responses/NoTasksFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", authenticateToken, taskController.getAllTasks);

/**
 * @openapi
 * /api/v1/tasks/{taskID}:
 *   get:
 *     summary: Get a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/taskID'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskReturn'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'  
 *       '404':
 *         $ref: '#/components/responses/TaskNotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:taskID", authenticateToken, taskController.getTask);

/**
 * @openapi
 * /api/v1/tasks/{taskID}/logs:
 *   get:
 *     summary: Get logs for a task
 *     tags:
 *       - Logs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/taskID'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'  
 *       '404':
 *         $ref: '#/components/responses/TaskNotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:taskID/logs", authenticateToken, logController.getTaskLog);
 
/**
 * @openapi
 * /api/v1/tasks:
 *   post:
 *     summary: Create a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '201':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskReturn'
 *       '400':
 *         $ref: '#/components/responses/MissingKey'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", authenticateToken, taskController.createTask);

/**
 * @openapi
 * /api/v1/tasks/{taskID}:
 *   patch:
 *     summary: Edit a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/taskID'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskReturn'
 *       '400':
 *         $ref: '#/components/responses/EmptyBody'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '404':
 *         $ref: '#/components/responses/TaskNotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.patch("/:taskID", authenticateToken, taskController.editTask);

/**
 * @openapi
 * /api/v1/tasks/{taskID}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/taskID'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskReturn'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '404':
 *         $ref: '#/components/responses/TaskNotFound'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:taskID", authenticateToken, taskController.deleteTask);


module.exports = router; 