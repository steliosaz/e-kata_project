const db = require('../services/connectdb');

exports.del_offer = async (req, res, next) => {
  let {store, productID, offer_value  } = req.query; // added actionType
    console.log('query',req.query);
    if(!productID){
        return res.status(400).json({ message: "No id found"})
    }
    db.query(
        'DELETE FROM offers WHERE product_id = ? AND  shop_name = ? AND offer_value = ?',
        [productID, store, offer_value],
        (error, results) => {
            if (error) {
                console.error('Error fetching products:', error);
                return res.status(500).json({ message: 'Error fetching products' });
            }
    
            res.status(200).json(results);
        }
    );
}