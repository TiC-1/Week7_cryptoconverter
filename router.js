// 'use strict';
//
// const express = require("express");
// const router = express.Router();
// const bodyParser = require('body-parser');
// const loginHandler = require("./loginHandler");
// const logoutHandler = require("./logoutHandler");
// const postsHandler = require("./postsHandler");
//
// router.use(bodyParser.urlencoded({ extended: false }));
//
// router.post("/login", (req, res) => {
//   loginHandler(req, res);
// });
//
// router.get("/logout", (req, res) => {
//   logoutHandler(req, res);
// });
//
// router.get("/posts", (req, res) => {
//   postsHandler.index(req, res);
// });
//
// router.post("/post/create", (req, res) => {
//   postsHandler.create(req, res);
// });
//
// router.use(express.static(__dirname+"/../public"));
//
// module.exports = router;
