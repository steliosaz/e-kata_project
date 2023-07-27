const db = require('../services/connectdb');

exports.get_products = async (req, res, next) => {
    const { subcategory } = req.query;
  
    // Query the database to fetch products based on the selected category and subcategory
    db.query(
      'SELECT * FROM product WHERE subcategory = ?',
      [subcategory],
      (error, results) => {
        if (error) {
          console.error('Error fetching products:', error);
          res.status(500).json({ message: 'Error fetching products' });
          return;
        }
        else {
            console.log("Products are1: ");
        }
  
        res.status(200).json(results);
      }
    );
  }