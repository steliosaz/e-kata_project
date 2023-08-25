const db = require('../services/connectdb');

exports.save_offer = async (req, res, next) => {
    let { shopname, offervalue, productid, start_date , stock, rate,discount_hunter, likes, dislikes, expire_date } = req.body;
    // Prevent SQL Injection by escaping user inputs
    console.log(req.body);
    let query = 'INSERT INTO offers(shop_name,offer_value,product_id,start_date,stock,rate,discount_hunter, likes, dislikes,expire_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [shopname, offervalue, productid, start_date, stock ,rate,discount_hunter, likes, dislikes, expire_date], (error) => {
        if (error) {
            console.log(error);
            res.status(500).send({message:'An error occurred while saving the offer.'});
            return next();
        }
        res.status(200).send({message:'Offer saved successfully.'});
        
    })
}