const express = require('express');
const router = express.Router();
const { login } = require('../authorization/login');
const { register } = require('../authorization/register');
const { upload } = require('../admin/upload');

router.route('/api/upload').post(upload)


module.exports = router;