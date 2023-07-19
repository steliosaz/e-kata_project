const db = require('../services/connectdb');

exports.get_categories = async(req, res, next) => {
    db.query('SELECT * FROM product', (error, results) => {
        if (error) {
          console.error('Error fetching categories:', error);
          res.status(500).json({ message: 'Error fetching categories' });
          return;
        }
    
        res.status(200).json(results);
      });
}