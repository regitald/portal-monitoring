var express = require('express');
var router = express.Router();
var {login} = require('../services/authenticationService/login')

router.post('/login',login)

module.exports = router;
