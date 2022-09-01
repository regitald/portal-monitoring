var express = require('express');
var router = express.Router();
var {
    getAllUserRole,
    getUserRoleById,
    addUserRole,
    updateUserRole,
    deleletUserRole
} = require('../controllers/userRole/userRoleController')

router.get('/',getAllUserRole)
router.post('/',addUserRole)
router.get('/:id',getUserRoleById)
router.put('/:id',updateUserRole)
router.delete('/:id',deleletUserRole)

module.exports = router;
