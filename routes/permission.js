var express = require('express');
var router = express.Router();
var {
    getAllPermissions,
    getPermissionById,
    addPermission,
    updatePermission
} = require('../services/permissionServices/permissionService')

router.get('/',getAllPermissions)
router.post('/',addPermission)
router.get('/:id',getPermissionById)
router.put('/:id',updatePermission)

module.exports = router;
