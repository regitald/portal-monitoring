var express = require('express');
var router = express.Router();
var {getMaintenanceList,addMaintenance,
    updatedMaintenance, getMaintenanceById} = require('../controllers/maintenance/maintenanceController')

router.get('/',getMaintenanceList)
router.get('/:id',getMaintenanceById)
router.post('/',addMaintenance)
router.put('/:id',updatedMaintenance)

module.exports = router;
