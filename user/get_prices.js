const db = require('../services/connectdb');

exports.get_prices = async (req, res, next) => {
    const { product_id } = req.query;
    db.query(
        `
        SELECT value, date
        FROM price
        WHERE product_id = ?
    `,
        [parseInt(product_id)],
        (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Error fetching products' });
            return;
        }
        else {
            console.log("Products are: ", results);
        }

        res.status(200).json(results);
        }
    );
    }