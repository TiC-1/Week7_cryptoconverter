// QUERIES

var db = require("./db_connection.js");
var querystring = require("querystring");


// Get currencies from currencies table
function getCurrencies() {
  console.log("Enter getCurrencies function");
  return db.query("SELECT * FROM currencies;")
    .then(result => {
      console.log("QUERY RESULT = ", result.rows);
      return (result.rows);
    });
}

module.exports = {
  getCurrencies: getCurrencies
}
