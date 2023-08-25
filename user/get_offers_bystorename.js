const db = require('../services/connectdb');

exports.get_offers_bystorename = async (req, res, next) => {
  // Assuming the shop name comes as a query parameter or in the request body
  const shopName = req.query.shop_name || req.body.shop_name;
  
  if (!shopName) {
    return res.status(400).json({ message: 'Shop name is required' });
  }

  const sqlQuery = `
    SELECT o.*, p.name AS product_name, p.path AS product_path
    FROM offers o
    JOIN product p ON o.product_id = p.id
    WHERE o.shop_name = ?;
  `;

  db.query(sqlQuery, [shopName], (error, results) => {
    if (error) {
      console.error('Error fetching offers:', error);
      // Passing the error to the error-handling middleware
      return next(error);
    }

    res.status(200).json(results);
  });
};
