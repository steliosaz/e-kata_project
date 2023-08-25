const db = require('../services/connectdb');

exports.get_users = async (req, res, next) => {
    //const is_user = req.query.is_user;
    // Query the database to fetch users
        db.query(
        'SELECT * FROM earnings',
        (error, results) => {
            if (error) {
                console.error('Error fetching users:', error);
                return res.status(500).json({ message: 'Error fetching users' });
            }
  
            res.status(200).json(results);
        }
    );
}