const db = require('../services/connectdb');

exports.add_points = async (req, res, next) => {
  let { user_name, points } = req.body;
  console.log(req.body);  

  // First, check if the user_name exists
  const checkQuery = 'SELECT * FROM earnings WHERE user_name = ?';
  db.query(checkQuery, [user_name], (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
          return;
      }
      
      if (results.length === 0) {
          // If the user_name doesn't exist, insert it
          const insertQuery = 'INSERT INTO earnings (user_name, monthly_score) VALUES (?, ?)';
          db.query(insertQuery, [user_name, points], (error, results) => {
              if (error) {
                  console.error(error);
                  res.status(500).json({ message: 'Internal server error' });
                  return;
              }
              
              res.status(200).json({ message: 'User and points added successfully' });
          });
      } else {
          // If the user_name exists, update the points
          const updateQuery = 'UPDATE earnings SET monthly_score = IFNULL(monthly_score, 0) + ? WHERE user_name = ?';
          db.query(updateQuery, [points, user_name], (error, results) => {
              if (error) {
                  console.error(error);
                  res.status(500).json({ message: 'Internal server error' });
                  return;
              }
              
              res.status(200).json({ message: 'Points updated successfully' });
          });
      }
  });
};