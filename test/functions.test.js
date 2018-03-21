var test = require("tape");
// var supertest = require("supertest");
var db = require("../src/database/db_connection.js");
var populateDb = require("../src/database/db_populate.js");
var queries = require("../src/database/db_queries.js");
var functions = require("../src/functions.js");

data = [{
    id: 1,
    name: 'US Dollar',
    code: 'USD'
  },
  {
    id: 2,
    name: 'Euro',
    code: 'EUR'
  },
  {
    id: 3,
    name: 'Bitcoin',
    code: 'BTC'
  },
  {
    id: 4,
    name: 'Ethereum',
    code: 'ETH'
  }
]

test("Populate the database", function(assert) {
  populateDb(function() {
    assert.ok(true)
    assert.end();
  });
});

test("Test getCurrenciesTableData function", function(assert) {
  console.log("Enter Test function");
  queries.getCurrenciesTableData()
    .then(result => {
      console.log("TEST RESULT =", result);
      assert.ok(result[0].hasOwnProperty("id"), "result has 'id' property");
      assert.end();
    });
});

test("Test listCurrenciesCodes function", function(assert) {
  console.log("Enter Test function");
  codes = functions.listCurrenciesCodes(data);
  console.log("TEST RESULT =", codes);
  assert.ok(codes.length > 0, "array has length > 0");
  assert.equal(codes[3], "ETH", "array has 'ETH' value");
  assert.end();
});

test("Test combineCurrenciesCodes function", function(assert) {
  console.log("Enter Test function");
  combinations = functions.combineCurrenciesCodes(codes)
  console.log("TEST RESULT =", combinations);
  assert.ok(combinations.length > 0, "array has length > 0");
  assert.equal(combinations[11], "ETH-BTC", "array has 'ETH-BTC' value");
  assert.end();
});

test("Test getRatesFromAPI function", function(assert) {
  console.log("Enter Test function");
  var rates = functions.getRatesFromAPI(combinations)
    .then(result => {
      console.log("TEST RESULT =", rates);
      assert.ok(codes.length > 0, "array has length > 0");
      assert.end();
    });
});





test("End pool connection", function(assert) {
  db.end(function() {
    assert.end();
  });
});
