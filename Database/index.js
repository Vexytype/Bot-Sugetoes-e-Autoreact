const {
    JsonDatabase,
  } = require("wio.db");


  const General = new JsonDatabase({
    databasePath: "./Database/config.json"
  });

module.exports = {  General  }