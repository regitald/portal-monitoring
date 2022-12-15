var express = require('express');
var router = express.Router();
var {importLogProduction} = require('../controllers/logProduction/logProductionController')

/* GET home page. */
router.post('/import',importLogProduction)

module.exports = router;
