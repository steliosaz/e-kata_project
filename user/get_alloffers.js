const db = require('../services/connectdb');

exports.get_all_offers = async(req, res, next) => {
    db.query('SELECT * FROM archived_offers', (error, results) => {
        if (error) {
          console.error('Error fetching offers:', error);
          res.status(500).json({ message: 'Error fetching categories' });
          return;
        }
    
        res.status(200).json(results);
      });
}