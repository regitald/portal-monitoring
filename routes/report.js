var express = require('express');
var router = express.Router();
var {
    getLogReport
} = require('../controllers/report/reportController')

router.get('/log',getLogReport)

module.exports = router;
