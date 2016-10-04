var express = require('express');
var nools = require('nools');
var logger = require('morgan');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.send('OK');
});

module.exports = router;