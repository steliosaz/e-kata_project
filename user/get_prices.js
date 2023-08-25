const db = require('../services/connectdb');

exports.get_prices = async (req, res, next) => {
    const lastSevenDays = req.query.lastSevenDays ? req.query.lastSevenDays.split(',') : [];

    const placeholders = lastSevenDays.map(() => '?').join(',');
    const sqlQuery = `
        SELECT value, date
        FROM price
        WHERE product_id = ? AND DATE(date) IN (${placeholders})
    `;

    db.query(
        sqlQuery,
        [req.query.product_id, ...lastSevenDays],
        (error, results) => {
            if (error) {
                console.error('Error on get_price endpoint:', error);
                res.status(500).json({ message: 'Error fetching products' });
                return;
            } else {
                console.log(`Values and Dates for the selected id : ${req.query.product_id} just triggered`);
            }

            res.status(200).json(results);
        }
    );
};