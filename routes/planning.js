var express = require('express');
var router = express.Router();
var {
    getPlanningList,
    updatePlanning,
    addPlanning
} = require('../controllers/planning/planningController')

router.get('/:period',getPlanningList)
router.put('/:period/:id',updatePlanning)
router.post('/:period',addPlanning)

module.exports = router;
