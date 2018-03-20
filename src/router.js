'use strict';

const express = require("express");
const router = express.Router();

router.use(express.static(__dirname+"/../public"));

module.exports = router;
