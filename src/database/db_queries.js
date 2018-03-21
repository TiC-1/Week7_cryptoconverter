// QUERIES

var db = require("./db_connection.js");
var querystring = require("querystring");


// Read data from currencies table
function getCurrenciesTableData() {
  console.log("Enter getCurrenciesTableData function");
  return db.query("SELECT * FROM currencies;")
    .then(result => {
      console.log("QUERY RESULT = ", result.rows);
      return (result.rows);
    });
}

// Read data from rates table
function getRatesTableData() {
  console.log("Enter getRatesTableData function");
  return db.query("SELECT * FROM rates;")
    .then(result => {
      console.log("QUERY RESULT = ", result.rows);
      return (result.rows);
    });
}

// Write (update) data into rates table
function updateRatesTable(base, target, rate, timestamp) {
  console.log("Enter updateRatesData function");
  console.log(base, target, rate, timestamp);
  db.query("DELETE FROM rates WHERE fromcurrency_id=(SELECT id FROM currencies WHERE code=$1) AND tocurrency_id=(SELECT id FROM currencies WHERE code=$2);", [base, target])
    .then(function() {
      db.query("INSERT INTO rates VALUES ((SELECT id FROM currencies WHERE code=$1), (SELECT id FROM currencies WHERE code=$2), $3, $4);", [base, target, rate, timestamp]);
    })
}

module.exports = {
  getCurrenciesTableData: getCurrenciesTableData,
  getRatesTableData: getRatesTableData,
  updateRatesTable: updateRatesTable
}
