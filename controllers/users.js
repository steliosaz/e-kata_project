const express = require('express');
const { get_categories } = require('../user/get_categories');
const { get_subcategories } = require('../user/get_subcategories');
const { get_products } = require('../user/get_products');
const { get_prices } = require('../user/get_prices');
const {get_id} = require('../user/get_id');
const {add_points} = require('../user/add_points');
const {save_offer} = require('../user/save_offer')
const router = express.Router();

router.route('/api/categories').get(get_categories)
router.route('/api/subcategories').get(get_subcategories)
router.route('/api/products').get(get_products)
router.route('/api/prices').get(get_prices)
router.route('/api/id').get(get_id)

router.route('/api/save/offer').post(save_offer)

router.route('/api/points').put(add_points)
module.exports = router;