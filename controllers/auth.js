const express = require('express');
const router = express.Router();
const { login } = require('../authorization/login');
const { register } = require('../authorization/register');
const { change } = require('../authorization/change')

router.route('/login').post(login)
router.route('/register').post(register)

router.route('/change').put(change)

module.exports = router;