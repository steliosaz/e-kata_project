const db = require('../services/connectdb');


exports.get_subcategories = async(req, res, next) => {
    const selectedCategory = req.query.category;
  // Query the database to fetch subcategories based on the selected category
  db.query('SELECT subcategory FROM product WHERE category = ?', [selectedCategory], (error, results) => {
    if (error) {
      console.error('Error fetching subcategories:', error);
      res.status(500).json({ message: 'Error fetching subcategories' });
      return;
    }

    res.status(200).json(results);
  });
}