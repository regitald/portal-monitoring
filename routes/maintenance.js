var express = require('express');
var router = express.Router();
var {getMaintenanceList,addMaintenance,updatedMaintenance} = require('../controllers/maintenance/maintenanceController')

router.get('/',getMaintenanceList)
router.post('/',addMaintenance)
router.put('/:id',updatedMaintenance)

module.exports = router;
