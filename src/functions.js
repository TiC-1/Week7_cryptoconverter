// GENERIC SHARED PURE FUNCTIONS

var querystring = require("querystring");


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
  var ratesFromAPI = [];
  currenciesCombinationsList.forEach(function(element) {
    var endURL = element.toLowerCase();
    axios.get("https://api.cryptonator.com/api/ticker/" + endURL)
      .then(result => {
        array.push(result);
      });
  });
  console.log(ratesFromAPI)
  return ratesFromAPI;
}

module.exports = {
  listCurrenciesCodes: listCurrenciesCodes,
  combineCurrenciesCodes: combineCurrenciesCodes,
  getRatesFromAPI: getRatesFromAPI
}
