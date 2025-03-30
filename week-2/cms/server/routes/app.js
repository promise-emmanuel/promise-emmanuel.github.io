var express = require('express');
const path = require('path');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../dist/cms/browser/index.csr.html'));
//   res.sendFile(path.join(__dirname, '../../src/index.html'));
});

module.exports = router;
