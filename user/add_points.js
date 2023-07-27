const db = require('../services/connectdb');

exports.add_points = async (req, res, next) => {
    let { userid, points } = req.body;
    console.log(req.body);  
    const query = 'UPDATE users SET points = IFNULL(points, 0) + ? WHERE id = ?';
    const queryValues = [points, userid];
    
    db.query(query, queryValues, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Points updated successfully' });
      }
    });
};