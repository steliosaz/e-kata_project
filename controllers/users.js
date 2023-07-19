const express = require('express');
const { get_categories } = require('../user/get_categories');
const { get_subcategories } = require('../user/get_subcategories');
const router = express.Router();

router.route('/api/categories').get(get_categories)
router.route('/api/subcategories').get(get_subcategories)


module.exports = router;