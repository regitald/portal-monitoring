var express = require('express');
var router = express.Router();
var {getAllUser,getUserById,addUser,
    updateUser,activeDeactiveUser} = require('../services/userService/userService')
var {validateAddUserRequest} = require('../services/userService/userMiddlewares')

router.get('/',getAllUser)
router.get('/:id',getUserById)
router.post('/',validateAddUserRequest,addUser)
router.put('/:id',updateUser)
router.patch('/active-deactive/:id',activeDeactiveUser)

module.exports = router;
