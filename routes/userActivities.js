var express = require('express');
var router = express.Router();
var {getAllUserActivities} = require('../controllers/userActivity/userActivityController')

router.get('/',getAllUserActivities)

module.exports = router;
