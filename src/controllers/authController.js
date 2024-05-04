const Service = require("../services/authService");

/**
 * Register a new user with the provided name, email, and password.
 *
 * @param {Object} req - The request object containing name, email, password
 * @param {Object} res - The response object 
 * @return {Promise} A Promise representing the result of the registration process
 */
const register = async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({status: "Error", message: "name, email and password are required"});
    }
    try {
        await Service.register(name, email, password);
        return res.status(201).send({status: "OK", message: "New user created"});
    } catch (err) {
        return res.status(err?.status || 500).send({status: "Error", error: err?.message || err});
    }
}; 

/**
 * Asynchronous function to handle user login.
 *
 * @param {Object} req - The request object containing email and password
 * @param {Object} res - The response object 
 * @return {Promise} A Promise with the token generated upon successful login
 */
const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).send({status: "Error", message: "email and password are required"});
    } 
    try {
        const token = await Service.login(email, password);
        return res.status(200).json({token});
    } catch (err) {
        return res.status(401).send({status: "Error", error: err.message});
    }
}

module.exports = {
    register, 
    login
}
