// GENERIC SHARED PURE FUNCTIONS

var querystring = require("querystring");


// List currencies in database
function listCurrencies(currencies) {
    currencies = JSON.stringify(currencies.rows);
    console.log(currencies);
    return currencies;
 }



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
