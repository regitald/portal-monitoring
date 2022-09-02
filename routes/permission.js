var express = require('express');
var router = express.Router();
var {
    getAllPermissions,
    getPermissionById,
    addPermission,
    updatePermission
} = require('../controllers/permission/permissionController')

router.post('/',addPermission)
router.get('/',getAllPermissions)
router.get('/:id',getPermissionById)
router.put('/:id',updatePermission)

module.exports = router;
