const db = require('../services/connectdb');

exports.get_coor_byname = async (req, res, next) => {
    const name = req.query.id;
  
    if (!id) {
        return res.status(400).json({ message: "ID is required" });
    }
  
    // Query the database to fetch products based on the ID
    db.query(
        'SELECT name, category FROM product WHERE id = ?',
        [id],
        (error, results) => {
            if (error) {
                console.error('Error fetching products:', error);
                return res.status(500).json({ message: 'Error fetching products' });
            }
  
            res.status(200).json(results);
        }
    );
}