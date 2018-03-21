var test = require("tape");
// var supertest = require("supertest");
var populateDb = require("../src/database/db_populate.js");
var queries = require("../src/database/db_queries.js");
var functions = require("../src/functions.js");

test("Populate the database", function(assert) {
  populateDb(function() {
    assert.ok(true)
    assert.end();
  });
});

test("Test get currencies from database", function(assert) {
  console.log("Enter Test function");
  queries.getCurrencies()
  .then(result => {
    console.log("TEST RESULT =", result);
    assert.ok(result[0].hasOwnProperty("id"), "result has 'id' property");
    assert.end();
  });
});

// test("Create a task", function(assert) {
//   supertest(tasksHandler.create)
//     .post("/task/create")
//     // Test escape function whith query injection while creating the new task
//     .send("title=My new task&users=1&users=';DELETE FROM tasks_assignments;")
//     .end(function(err, result) {
//       if (err) {
//         console.error(err);
//       }
//       db.query("SELECT * FROM tasks WHERE title='My new task'",
//         function(err, result) {
//           console.log(result.rows);
//           assert.ok(result.rows.length >= 1, "A new task has been created");
//           assert.end();
//         });
//     });
// });
//
// test("Delete a task", function(assert) {
//   supertest(tasksHandler.deleteTask)
//     .post("/task/delete")
//     .send("id=1")
//     .end(function(err, result) {
//       if (err) {
//         console.error(err);
//       }
//       db.query("SELECT * FROM tasks_assignments WHERE task_id=1",
//         function(err, result) {
//           console.log(result.rows);
//           assert.ok(result.rows.length == 0, "Task with id=1 has been deleted in tasks list and tasks assigments");
//           assert.end();
//         });
//     });
// });
//
// // test("End pool connection", function(assert) {
// //   db.end(function() {
// //     assert.end();
// //   });
// // });
