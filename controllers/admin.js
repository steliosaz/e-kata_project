const express = require('express');
const router = express.Router();
const { login } = require('../authorization/login');
const { register } = require('../authorization/register');
const { upload } = require('../admin/upload');
const { tokensCrafter } = require('../user/tokens_crafter');

router.route('/api/upload').post(upload)

router.route('/api/tokens_crafter').put(tokensCrafter)
module.exports = router;