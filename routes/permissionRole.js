var express = require('express');
var router = express.Router();
var {
    getAllPermissionRole,
    getPermissionRoleById,
    addPermissionRoleRole,
    updatePermissionRole
} = require('../controllers/permissionRole/permissionRoleController')

router.get('/',getAllPermissionRole)
router.post('/',addPermissionRoleRole)
router.get('/:id',getPermissionRoleById)
router.put('/:id',updatePermissionRole)

module.exports = router;
