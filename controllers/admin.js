const express = require('express');
const router = express.Router();
const { login } = require('../authorization/login');
const { register } = require('../authorization/register');
const { upload } = require('../admin/upload');
const { tokensCrafter } = require('../user/tokens_crafter');
const { del_offer } = require('../user/del_offer');

router.route('/api/upload').post(upload)
router.route('/api/del_offer').delete(del_offer)
router.route('/api/tokens_crafter').put(tokensCrafter)
module.exports = router;