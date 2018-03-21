// GENERIC SHARED PURE FUNCTIONS

var querystring = require("querystring");
var axios = require("axios");
var queries = require("./database/db_queries.js");


// List currencies code in an array
function listCurrenciesCodes(currenciesData) {
  console.log("Enter listCurrenciesCodes function");
  console.log(currenciesData);
  var currenciesCodes = [];
  currenciesData.forEach(function(item) {
    currenciesCodes.push(item.code);
  });
  console.log(currenciesCodes);
  return currenciesCodes;
}

// list currencies codes combinations in an array
function combineCurrenciesCodes(currenciesCodesList) {
  console.log("Enter combineCurrenciesCodes function");
  currenciesCombinations = [];
  currenciesCodesList.forEach(function(element1) {
    currenciesCodesList.forEach(function(element2) {
      if (element2 != element1) {
        currenciesCombinations.push(element1 + '-' + element2);
      } else {
        return;
      }
    });
  });
  console.log("CURRENCIES COMBINATIONS = ", currenciesCombinations);
  return currenciesCombinations;
}

function getRatesFromAPI(currenciesCombinationsList) {
  console.log("Enter getRatesFromAPI function");
  currenciesCombinationsList.forEach(function(element) {
    var endURL = element.toLowerCase();
    axios.get("https://api.cryptonator.com/api/ticker/" + endURL, {maxRedirects: 5})
      .then(function(response) {
        console.log(response.data);
        response = response.data;
        var from = response.ticker.base;
        var to = response.ticker.target;
        var rate = response.ticker.price;
        var timestamp = response.timestamp;
        queries.updateRatesTable(from, to, rate, timestamp);
      });
  });
}

module.exports = {
  listCurrenciesCodes: listCurrenciesCodes,
  combineCurrenciesCodes: combineCurrenciesCodes,
  getRatesFromAPI: getRatesFromAPI
}
