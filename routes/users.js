var express = require('express');
var router = express.Router();
var {getAllUser,getUserById,addUser,deleteUser,
    updateUser,activeDeactiveUser,changePassword} = require('../controllers/user/userController')
var {validateAddUserRequest} = require('../controllers/user/userMiddlewares')

router.get('/',getAllUser)
router.get('/:id',getUserById)
router.post('/',validateAddUserRequest,addUser)
router.patch('/password',changePassword)
router.put('/:id',updateUser)
router.patch('/active-deactive/:id',activeDeactiveUser)
router.delete('/:id',deleteUser)

module.exports = router;
