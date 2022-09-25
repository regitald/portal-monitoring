var express = require('express');
var router = express.Router();
var {
    getPlanningList,
    updatePlanning,
    addPlanning,
    importPlanning,
    getPlanningById,getGraphicPlan
} = require('../controllers/planning/planningController')

router.post('/import',importPlanning)
router.get('/:period/graphic',getGraphicPlan)
router.get('/:period',getPlanningList)
router.get('/:period/:id',getPlanningById)
router.put('/:period/:id',updatePlanning)
router.post('/:period',addPlanning)

module.exports = router;
