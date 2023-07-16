const express = require('express');
const router = express.Router();
const { login } = require('../authorization/login');
const { register } = require('../authorization/register');

router.route('/login').post(login)
router.route('/login').post(register)

module.exports = router;