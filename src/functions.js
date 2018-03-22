// GENERIC SHARED PURE FUNCTIONS

var querystring = require("querystring");
var axios = require("axios");
var queries = require("./database/db_queries.js");


// List currencies code in an array
function listCurrenciesCodes(currenciesData) {
  var currenciesCodes = [];
  currenciesData.forEach(element => {
    currenciesCodes.push(element.code);
  });
  return currenciesCodes;
}

// list currencies codes combinations in an array
function combineCurrenciesCodes(currenciesCodesList) {
  currenciesCombinations = [];
  currenciesCodesList.forEach(element1 => {
    currenciesCodesList.forEach(element2 => {
      if (element2 != element1) { // exclude same to same combination
        currenciesCombinations.push(element1 + '-' + element2);
      } else {
        return;
      }
    });
  });
  return currenciesCombinations;
}

// get change rates from 'cryptonator' API based on currencies combinations
function getRatesFromAPI(currenciesCombinationsList) {
  currenciesCombinationsList.forEach(element => {
    var endURL = element.toLowerCase();
    axios.get("https://api.cryptonator.com/api/ticker/" + endURL, {
        maxRedirects: 5
      })
      .then(response => {
        response = response.data;
        var from = response.ticker.base;
        var to = response.ticker.target;
        var rate = response.ticker.price;
        var timestamp = response.timestamp;
        queries.updateRatesTable(from, to, rate, timestamp); // run query to write into database
      });
  });
}

function checkRatesAge() {
  queries.getRatesAge()
    .then(result => {
      // If rates are to old run request to API
      if (Date.now() - result >= 10 * 60 * 1000) { // 10 minutes
        getRatesFromAPI();
      }
    });
}
module.exports = {
  listCurrenciesCodes: listCurrenciesCodes,
  combineCurrenciesCodes: combineCurrenciesCodes,
  getRatesFromAPI: getRatesFromAPI
}
