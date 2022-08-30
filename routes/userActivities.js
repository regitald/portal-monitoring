var express = require('express');
var router = express.Router();
var {logUserActivity,getAllUserActivities} = require('../controllers/userActivity/userActivityController')

router.get('/',getAllUserActivities)
router.post('/',logUserActivity)

module.exports = router;
