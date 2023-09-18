const db = require('../services/connectdb');

exports.add_rate = async (req, res, next) => {
  let { itemid, points, actionType, offer_value, user, action_date , store } = req.body; // added actionType
    console.log(req.body);
  
  let query1 = 'UPDATE actions SET action_type = ? WHERE product_id = ? AND shop_name = ?'
  let query3 = 'SELECT * FROM actions WHERE product_id = ? AND shop_name = ?'
  let query2 = 'INSERT INTO actions (product_id, user_name, action_type, offer_value, action_date, shop_name) VALUES (?, ?, ?, ?, ?, ?)';
  let queryValues2 = [itemid, user, actionType, offer_value, action_date, store];
  let queryValues3 = [itemid, store];
  let query1Value = [actionType,itemid,store];
  
  db.beginTransaction((err) => {

      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
          return;
      }
      db.query(query3, queryValues3, (error,results) =>{
        if (error) {
            return db.rollback(() => {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            });
        }
        if (results){
            db.query(query1, query1Value,(error,results) =>{
                console.log(results)
                console.log('Update query triggered')
            })
        }
        else{
            db.query(query2,queryValues2,(error,results) =>{
                console.log(results)
                console.log('Insert query triggered')
            })
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
      })
  });
};