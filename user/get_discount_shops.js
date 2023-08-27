const db = require('../services/connectdb');

exports.get_discinfo = async(req, res, next) => {
    
    db.query('SELECT * FROM offers', (error, results) => {
        if (error) {
          console.error('Error fetching offers:', error);
          res.status(500).json({ message: 'Error fetching offers' });
          return;
        }
    
        res.status(200).json(results);
    });
}