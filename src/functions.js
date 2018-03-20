// GENERIC SHARED PURE FUNCTIONS

var db = require("./database/db_connection.js");
var querystring = require("querystring");

// List currencies in database
function listCurrencies(request, response) {
  db.query("SELECT * FROM currencies;", function(err, result) {
    if (err) {
      response.writeHead(500);
      return response.end();
    }
    response.writeHead(200, {
      "Content-Type": "application/json"
    });
    response.end(JSON.stringify(result.rows));
  });
}
