const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

/**
 * @openapi
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       '201':
 *         description: User created
 *       '400':
 *         $ref: '#/components/responses/BadRequestUser' 
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/register", authController.register);

/**
 * @openapi
 * /api/v1/user/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       '400':
 *         $ref: '#/components/responses/BadRequestUser'
 *       '401':
 *         $ref: '#/components/responses/BadLogin'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/login", authController.login);

// router.post("/logout", authController.logout);

module.exports = router;
