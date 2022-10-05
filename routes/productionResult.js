var express = require('express');
var router = express.Router();
var {addProductionResult,getProductionResult,
    getProductionResultById} = require('../controllers/productionResult/productionResultController')

router.get('/',getProductionResult)
router.get('/:id',getProductionResultById)
router.post('/',addProductionResult)

module.exports = router;
