var express = require('express');
var router = express.Router();
var {getMachineKpi} = require('../controllers/machineKpi/machineKpiController')

router.get('/kpi',getMachineKpi)

module.exports = router;
