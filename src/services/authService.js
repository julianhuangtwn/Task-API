const User = require("../database/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();

/**
 * Registers a new User with the provided name, email and password.
 *
 * @param {string} name - The name of the new User.
 * @param {string} email - The email of the new User.
 * @param {string} password - The password of the new User.
 */
const register = async (name, email, password) => {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: uuidv4(),
            name,
            email,
            password: hashedPassword
        };
        User.register(newUser);
    } catch (err) {
        throw err;
    }
}

/**
 * Login with the provided email and password.
 *
 * @param {string} email - The email of the User.
 * @param {string} password - The password of the User.
 * @returns {string} JWT token.
 */
const login = async (email, password) => {
    try {
        const user = User.getUserByEmail(email);
        if (!user) {
            throw { status: 401, message: "Invalid email or password" };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw { status: 401, message: "Invalid email or password" };
        }

        //openssl genrsa -out ./private.key 4096
        //openssl rsa -in ./private.key -pubout -out ./public.key
        const privateKeyPEM = process.env.PRIVATE_KEY;
        //Synchronously read the private key
        const privateKey = fs.readFileSync(privateKeyPEM, 'utf8');
        const token = jwt.sign({id: user.id}, privateKey, {expiresIn: '1h', algorithm: 'RS256'} );
        return token;
    } catch (err) {
        throw { status: err?.status || 500, message: err?.message || err };
    }
}

module.exports = {
    register,
    login
}
