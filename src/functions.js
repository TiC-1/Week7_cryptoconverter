// GENERIC SHARED PURE FUNCTIONS

var db = require("./database/db_connection.js");
var querystring = require("querystring");


// List currencies in database
function listCurrencies(request, response) {
  db.query("SELECT * FROM currencies;", function(err, result) {
    if (err) {
      console.log("error!");
      return response.end();
    }
    var curr = response.end(JSON.stringify(result.rows));
    console.log(curr);
  });
}

listCurrencies();

// function getCombinations() {
//   var currencies_id = [1, 2, 3, 4];
//   var results = [];
//
//   for (var i = 0; i < currencies_id.length; i++) {
//     for (var j = 0; j < currencies_id.length; j++) {
//       results.push(currencies_id[i] + ' ' + currencies_id[j]);
//     }
//   }
  // ["1 1", "1 2", "1 3", "1 4",
  // "2 1", "2 2", "2 3", "2 4",
  // "3 1," "3 2", "3 3", "3 4",
  // "4 1", "4 2", "4 3", "4 4"]
//
//   console.log(results);
// }

module.exports = listCurrencies;
