const db = require('../services/connectdb');

exports.get_offers_history = async (req, res, next) => {
    const discount_hunter = req.query.discount_hunter;
    console.log('req.query.id',req.query.discount_hunter)
  
    if (!discount_hunter) {
        return res.status(400).json({ message: "Name is required" });
    }
  
    // Query the database to fetch products based on the ID
    db.query(
        `
        SELECT archived_offers.*, product.name , product.path
        FROM archived_offers
        INNER JOIN product ON archived_offers.product_id = product.id
        WHERE archived_offers.discount_hunter = ?
    `,
        [discount_hunter],
        (error, results) => {
            if (error) {
                console.error('Error fetching products:', error);
                return res.status(500).json({ message: 'Error fetching products' });
            }
  
            res.status(200).json(results);
        }
    );
}