const db = require('../services/connectdb');
const jwt = require('jsonwebtoken');

exports.change = async (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var userId = req.body.decodedid; 
    var user = req.body.user;

    console.log('query',req.body)

    if (password.length < 8) {
        return res.status(400).json({ message: "Password should be at least 8 characters long." });
    }

    // Check if password has at least one capital letter, one number, and one symbol
    var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password should contain at least one capital letter, one number, and one symbol." });
    }
    else if (password !== password2) {
        return res.status(400).json({ message: "Passwords must be the same" });
    }

    // Updating the user record in database
    db.query('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, password, userId], (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'An error occurred while updating the user.' });
        }
    db.query('UPDATE actions SET user_name = ? WHERE user_name = ?', [username,user], (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'An error occurred while updating the user.' });
        }
        

        // Update the offers table
    db.query('UPDATE offers SET discount_hunter = ? WHERE discount_hunter = ?', [username,user], (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'An error occurred while updating the offers.' });
        }
    db.query('UPDATE earnings SET user_name = ? WHERE user_name = ?', [username,user], (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'An error occurred while updating the offers.' });
        }
    
    db.query('UPDATE archived_offers SET discount_hunter = ? WHERE discount_hunter = ?', [username,user], (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'An error occurred while updating the offers.' });
        }
        
        return res.status(200).json({message: 'users , offers and archived_offers Updated.'})
    })
    
})
})
})})}