const db = require('../services/connectdb');

exports.offers_expired =  (c_date) => {
    
    let delQuery = 'DELETE FROM offers WHERE expire_date =?';
    
    db.query(`SELECT * FROM offers WHERE expire_date = '${c_date}'`, (fetchError, offers_expired) => {
        
        // If there are offers to archive
        if (offers_expired.length > 0) {
            let insertQuery = 'INSERT INTO archived_offers (shop_name, offer_value, product_id, start_date, stock, rate, discount_hunter, likes, dislikes,  expire_date) VALUES ?';

            let values = offers_expired.map(offer => [offer.shop_name, offer.offer_value, offer.product_id, offer.start_date, offer.stock, offer.rate, offer.discount_hunter, offer.likes, offer.dislikes, offer.expire_date]);

            db.query(insertQuery, [values], (insertError) => {
                if (insertError) {
                    console.error("Error inserting offers into archived_offers:", insertError);
                }
                db.query(delQuery,[c_date],(delError)=>{
                    if(delError){
                        console.error("Error deleting offer from offers table:", delError);
                    }
                })
            });
            
        } else {
            console.log('No offers to archive.');
        }
    });
}
