var express = require('express');
var router = express.Router();
var {
    getAllRoles,
    getRoleById,
    addRole,updateRole
} = require('../services/roleServices/rolesService')

router.get('/',getAllRoles)
router.post('/',addRole)
router.get('/:id',getRoleById)
router.put('/:id',updateRole)

module.exports = router;
