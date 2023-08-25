const db = require('../services/connectdb');

exports.get_everything = async(req, res, next) => {
    const sql = `
    SELECT 
            offers.*, 
            product.category, product.subcategory, 
            price.value, price.date
        FROM offers 
        LEFT JOIN product ON offers.product_id = product.id
        LEFT JOIN price ON offers.product_id = price.product_id
    `;

    db.query(sql, (error, results) => {
        if (error) {
          console.error('Error fetching offers with categories and subcategories:', error);
          res.status(500).json({ message: 'Error fetching offers with categories and subcategories' });
          return;
        }
    
        res.status(200).json(results);
    });
}