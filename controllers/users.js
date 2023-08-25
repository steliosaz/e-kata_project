const express = require('express');
const { get_categories } = require('../user/get_categories');
const { get_subcategories } = require('../user/get_subcategories');
const { get_products } = require('../user/get_products');
const { get_prices } = require('../user/get_prices');
const {get_id } = require('../user/get_id');
const {add_points} = require('../user/add_points');
const {save_offer} = require('../user/save_offer');
const { get_discinfo } = require('../user/get_discount_shops');
const { get_offers_productid } = require('../user/get_product_byid');
const { get_namecat_byID} = require('../user/get_category_byid');
const { get_shopname_byid } = require('../user/get_shopname_byID');
const { get_offers_bystorename } = require('../user/get_offers_bystorename');
const { get_username} = require('../user/get_usersname')
const { add_rate } = require('../user/add_rate');
const { offers_expired } = require('../user/offers_expired');
const { get_all_offers } = require('../user/get_alloffers');
const { get_users } = require('../user/get_users');
const { get_cat_sub} = require('../user/get_cat_sub');
const { get_everything} = require('../user/2fetchtrial');
const { get_offers_categories } = require('../user/get_products_categ');
const { get_offers_history } = require('../user/get_offers_history');
const { get_actions } = require('../user/get_actions');
const router = express.Router();


//get <<

router.route('/api/categories').get(get_categories)
router.route('/api/subcategories').get(get_subcategories)
router.route('/api/products').get(get_products)
router.route('/api/prices').get(get_prices)
router.route('/api/id').get(get_id)
router.route('/api/info').get(get_discinfo)
router.route('/api/productid').get(get_offers_productid)
router.route('/api/namecat_byID').get(get_namecat_byID)
router.route('/api/shopname_byID?').get(get_shopname_byid)
router.route('/api/offers_bystorename').get(get_offers_bystorename)
router.route('/api/get_username').get(get_username)
router.route('/api/get_offers_expired').get(offers_expired)
router.route('/api/get_all_offers').get(get_all_offers)
router.route('/api/get_users').get(get_users)
router.route('/api/get_cat_sub').get(get_cat_sub)
router.route('/api/2fetchtrial').get(get_everything)
router.route('/api/get_offers_categories').get(get_offers_categories)
router.route('/api/get_offers_history').get(get_offers_history)
router.route('/api/get_actions').get(get_actions)

//post <<

router.route('/api/save/offer').post(save_offer)
router.route('/api/add_rate').post(add_rate)



//put <<

router.route('/api/points').put(add_points)
module.exports = router;
 