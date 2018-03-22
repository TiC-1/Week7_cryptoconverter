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
  var requests = currenciesCombinationsList.map( (e) => {
    return axios.get("https://api.cryptonator.com/api/ticker/" + e.toLowerCase());
  })
  return axios.all(requests).then(axios.spread((...results) => {
    for(var i=0; i<results.length; i++) {
      response = results[i].data;
      if(response.ticker) {
        var from = response.ticker.base;
        var to = response.ticker.target;
        var rate = response.ticker.price;
        var timestamp = response.timestamp;
        queries.updateRatesTable(from, to, rate, timestamp); // run query to write into database
      }
    }
  })).catch((err) => {
    console.error(err);
  });
}

function checkRatesAge() {
  return queries.getRatesAge()
    .then(result => {
      var timeDifference = Date.now() - Date.parse(result[0].min);
      // If rates are to old run request to API
      if (timeDifference >= 10 * 60 * 1000) { // 10 minutes
        getRatesFromAPI();
        return false;
      }
      return true;
    });
}
module.exports = {
  listCurrenciesCodes: listCurrenciesCodes,
  combineCurrenciesCodes: combineCurrenciesCodes,
  getRatesFromAPI: getRatesFromAPI,
  checkRatesAge: checkRatesAge
}
