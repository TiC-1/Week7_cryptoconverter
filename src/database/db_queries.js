// QUERIES

var db = require("./db_connection.js");
var querystring = require("querystring");


// Get currencies data
function getCurrenciesTableData() {
  return db.query("SELECT * FROM currencies;")
    .then(result => {
      return (result.rows);
    });
}

// Get rates data
function getRatesTableData() {
  return db.query("SELECT * FROM rates;")
    .then(result => {
      return (result.rows);
    });
}

// Get rates and currencies specific data in order to build an array of objects
// on that schema { fromcurrency_id: 123, tocurrency_id: 456, change_rate: 0.789 }
function getCurrenciesAndRatesData() {
  return db.query("SELECT (SELECT name AS from_currency FROM currencies WHERE id=fromcurrency_id), (SELECT name AS to_currency FROM currencies WHERE id=tocurrency_id), rate AS change_rate FROM rates;")
    .then(result => {
      return (result.rows);
    });
}

// Update data into rates table
function updateRatesTable(from, to, rate, timestamp) {
  // delete row where 'from' and 'to' currencies match to actual values
  db.query("DELETE FROM rates WHERE fromcurrency_id=(SELECT id FROM currencies WHERE code=$1) AND tocurrency_id=(SELECT id FROM currencies WHERE code=$2);", [from, to])
    .then(function() {
      // add row where 'from' and 'to' currecies match to actual values
      db.query("INSERT INTO rates VALUES ((SELECT id FROM currencies WHERE code=$1), (SELECT id FROM currencies WHERE code=$2), $3, $4);", [from, to, rate, timestamp]);
    })
}

// Get oldest rate age based on his timestamp
function getRatesAge() {
  return db.query("SELECT MIN(timestamp) FROM rates;")
    .then(result => {
      return (result.rows);
    });
}

module.exports = {
  getCurrenciesTableData: getCurrenciesTableData,
  getRatesTableData: getRatesTableData,
  getCurrenciesAndRatesData: getCurrenciesAndRatesData,
  updateRatesTable: updateRatesTable,
  getRatesAge: getRatesAge
}
