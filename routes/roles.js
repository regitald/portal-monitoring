var express = require('express');
var router = express.Router();
var {
    getAllRoles,getRoleById,
    addRole,updateRole
} = require('../controllers/role/roleController')

router.get('/',getAllRoles)
router.post('/',addRole)
router.get('/:id',getRoleById)
router.put('/:id',updateRole)

module.exports = router;
