//File system
const fs = require("fs");

/**
 * Writes task to data.js 
 *
 * @param {Task} task - the Task to be saved to the database
 */
const saveToDatabase = (task) => {
    //Writes JSON converted task into data.json, include all fields(null), and 2 spaces indented
    //UTF-8 encoding
    fs.writeFileSync("./src/database/data.json", JSON.stringify(task, null, 2), {
      encoding: "utf-8",
    });
  };

module.exports = {saveToDatabase};