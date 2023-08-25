const db = require('../services/connectdb');

exports.tokensCrafter = async (req, res, next) => {
    
    const userMap = req.body.userMap;

    console.log('body of tokens_crafter endpoint',userMap)

    // iterate through each user in userMap
    for (const [username, values] of Object.entries(userMap)) {
       
        const monthly_score = values[3];
        const tokens = values[4]
        
        // Use prepared statement to prevent SQL injection
        const query = 'UPDATE earnings SET overall_score = overall_score + COALESCE(?, 0),  monthly_score = 0, tokens_earned = tokens_earned + COALESCE(?, 0),  last_months_tokens = COALESCE(?, 0) WHERE user_name = ?';
                
        db.query(query, [monthly_score, tokens, tokens, username], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
            } else {
                console.log(`Inserted/Updated data for ${username}`);
            }
        });
    }
}