var express = require('express');
var router = express.Router();
var {
    getAllUserRole,
    getUserRoleById,
    addUserRole,
    updateUserRole
} = require('../services/userRoleService/userRoleService')

router.get('/',getAllUserRole)
router.post('/',addUserRole)
router.get('/:id',getUserRoleById)
router.put('/:id',updateUserRole)

module.exports = router;
