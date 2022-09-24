var express = require('express');
var router = express.Router();
var {addProductionResult,getProductionResult} = require('../controllers/productionResult/productionResultController')

router.get('/',getProductionResult)
router.post('/',addProductionResult)

module.exports = router;
