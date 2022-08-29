var express = require('express');
var router = express.Router();
var {
    getAllPermissionRole,
    getPermissionRoleById,
    addPermissionRole,
    updatePermissionRole
} = require('../controllers/permissionRole/permissionRoleController')

router.get('/',getAllPermissionRole)
router.post('/',addPermissionRole)
router.get('/:id',getPermissionRoleById)
router.put('/:id',updatePermissionRole)

module.exports = router;
