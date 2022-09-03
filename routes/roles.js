var express = require('express');
var router = express.Router();
var {
    getAllRoles,getRoleById,
    addRole,updateRole,deleteRole
} = require('../controllers/role/roleController')

router.get('/',getAllRoles)
router.post('/',addRole)
router.get('/:id',getRoleById)
router.put('/:id',updateRole)
router.delete('/:id',deleteRole)

module.exports = router;
