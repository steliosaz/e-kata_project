const db = require('../services/connectdb');

exports.get_offers_productid = async(req, res, next) => {
    
    // Updated SQL query to select specific columns
    db.query('SELECT * FROM offers', (error, results) => {
        if (error) {
          console.error('Error fetching offers:', error);
          res.status(500).json({ message: 'Error fetching offers' });
          return;
        }
    
        res.status(200).json(results);
    });
}