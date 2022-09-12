var express = require('express');
var router = express.Router();
var {
    getPlanningList,
    updatePlanning,
    addPlanning,
    importPlanning
} = require('../controllers/planning/planningController')

router.post('/import',importPlanning)
router.get('/:period',getPlanningList)
router.put('/:period/:id',updatePlanning)
router.post('/:period',addPlanning)

module.exports = router;
