const db = require('../services/connectdb');

exports.get_offers_categories = async (req, res, next) => {
    const query = `
    SELECT offers.*, product.*
    FROM offers
    JOIN product ON offers.product_id = product.id
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ message: 'Error fetching data' });
    }
    
    return res.status(200).json(results);
  })
};
