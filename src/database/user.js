const data = require("./data.json");
const { saveToDatabase } = require("./utils");

/**
 * Registers a new User if it doesn't already exist.
 *
 * @param {User} newUser - The new User.
 */
const register = (newUser) => {
  data.users.forEach((user) => {
    if (user.email === newUser.email) {
      throw { status: 400, message: `User ${newUser.email} already exists.` };
    }
  });

  data.users.push(newUser);

  try {
    saveToDatabase(data);
  } catch (err) {
    throw { status: err?.status || 500, message: err?.message || err };
  }
};

/**
 * Finds a User by email.
 *
 * @param {string} email - The email address of the User 
 * @return {User} The matched User
 */
const getUserByEmail = (email) => {
  return data.users.find((user) => user.email === email);
};

module.exports = {
  register,
  getUserByEmail,
};
