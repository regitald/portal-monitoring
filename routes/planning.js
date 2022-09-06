var express = require('express');
var router = express.Router();
var {
    getPlanningList,
    updatePlanning,
    addPlanning
} = require('../controllers/planning/planningController')

router.get('/',getPlanningList)
router.put('/:id',updatePlanning)
router.post('/',addPlanning)

module.exports = router;
