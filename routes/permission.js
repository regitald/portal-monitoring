var express = require('express');
var router = express.Router();
var {
    getAllPermissions,
    getPermissionById,
    addPermissionRole,
    updatePermission
} = require('../controllers/permission/permissionController')

router.post('/',addPermissionRole)
router.get('/',getAllPermissions)
router.get('/:id',getPermissionById)
router.put('/:id',updatePermission)

module.exports = router;
