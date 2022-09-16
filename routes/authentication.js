var express = require('express');
var router = express.Router();
var {authenticate} = require('../controllers/authentication/authenticationController')

router.post('/login',authenticate)

module.exports = router;
