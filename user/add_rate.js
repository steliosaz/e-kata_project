const db = require('../services/connectdb');

exports.add_rate = async (req, res, next) => {
  let { itemid, points, actionType, offer_value, user, action_date , store } = req.body; // added actionType
    console.log(req.body);
  
  let query1, queryValues1;
  let query2 = 'INSERT INTO actions (product_id, user_name, action_type, offer_value, action_date) VALUES (?, ?, ?, ?, ?)ON DUPLICATE KEY UPDATE action_type = VALUES(action_type)';
  let queryValues2 = [itemid, user, actionType, offer_value, action_date];
  
  db.beginTransaction((err) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
          return;
      }
      
      if (actionType === "like") {
          query1 = 'UPDATE offers SET rate = IFNULL(rate, 0) + ?, likes = IFNULL(likes, 0) + 1 WHERE product_id = ? AND shop_name = ? AND offer_value = ?';
          queryValues1 = [points, itemid, store, offer_value];
      } else if (actionType === "dislike") {
          query1 = 'UPDATE offers SET rate = IFNULL(rate, 0) + ?, dislikes = IFNULL(dislikes, 0) + 1 WHERE product_id = ? AND shop_name = ? AND offer_value = ?';
          queryValues1 = [points, itemid, store, offer_value];
      } else {
          res.status(400).json({ message: 'Invalid actionType provided.' });
          return;
      }
      
      // First query
      db.query(query1, queryValues1, (error, results) => {
          if (error) {
              return db.rollback(() => {
                  console.error(error);
                  res.status(500).json({ message: 'Internal server error' });
              });
          }
          
          // Second query
          db.query(query2, queryValues2, (error, results) => {
              if (error) {
                  return db.rollback(() => {
                      console.error(error);
                      res.status(500).json({ message: 'Internal server error' });
                  });
              }
              
              db.commit((err) => {
                  if (err) {
                      return db.rollback(() => {
                          console.error(err);
                          res.status(500).json({ message: 'Internal server error' });
                      });
                  }
                  
                  res.status(200).json({ message: actionType === "like" ? 'Points and likes updated successfully' : 'Points and dislikes updated successfully' });
              });
          });
      });
  });
};