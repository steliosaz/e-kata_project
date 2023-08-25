const db = require('../services/connectdb');

exports.get_actions = async (req, res, next) => {
    const { user } = req.query; // Assuming product_id is a route parameter
    
    const query = `
    SELECT actions.*, product.name AS product_name
    FROM actions
    INNER JOIN product ON actions.product_id = product.id
    WHERE actions.user_name = ?`;

    db.query(query, [user], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'No actions or product found for given product_id' });
            } else {
                res.status(200).json(results);
            }
        }
    });
};