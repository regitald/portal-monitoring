var express = require('express');
var router = express.Router();
var userService = require('../services/user')

/* GET users listing. */
router.get('/', userService.getAllUser);
// router.post('/',user)
router.get('/:id', userService.getUserById);
router.post('/',userService.addUser)

module.exports = router;
