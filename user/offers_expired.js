const db = require('../services/connectdb');

exports.offers_expired = async (req, res, next) => {

    let { currentDate } = req.query;

    // Select all offers with expiry_date equal to today
    let fetchQuery = 'SELECT * FROM offers WHERE expire_date = ?';
    let delQuery = 'DELETE FROM offers WHERE expire_date =?';
    db.query(fetchQuery, [currentDate], (fetchError, offers_expired) => {
        if (fetchError) {
            console.error("Database Fetch Error:", fetchError);
            res.status(500).send({message: 'An error occurred while fetching expired offers.'});
            return next();
        }

        // If there are offers to archive
        if (offers_expired.length > 0) {
            let insertQuery = 'INSERT INTO archived_offers (shop_name, offer_value, product_id, start_date, stock, rate, discount_hunter, likes, dislikes,  expire_date) VALUES ?';

            let values = offers_expired.map(offer => [offer.shop_name, offer.offer_value, offer.product_id, offer.start_date, offer.stock, offer.rate, offer.discount_hunter, offer.likes, offer.dislikes, offer.expire_date]);

            db.query(insertQuery, [values], (insertError) => {
                if (insertError) {
                    console.error("Error inserting offers into archived_offers:", insertError);
                    res.status(500).send({message: 'An error occurred while archiving the offers.'});
                    return next();
                }

                // Optionally: Delete the offers from the original offers table after archiving (or you can leave them)

                res.status(200).send({message: 'Offers archived successfully.'});
            });
            db.query(delQuery,[currentDate],(delError)=>{
                if(delError){
                    console.error("Error deleting offer from offers table:", delError);
                }
            })
        } else {
            res.status(200).send({message: 'No offers to archive.'});
        }
    });
}
