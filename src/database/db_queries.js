var db = require("./db_connection.js");

function getCurrencies() {
  return db.query(
    "SELECT * FROM currencies";
  );
}

module.exports = {getCurrencies: getCurrencies};
