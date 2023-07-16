const db = require('../services/connectdb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
secretKey = process.env.SECRETKEY

exports.login = async(req, res, next) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'AdminPass2023!') {
        const tokenPayload = { userid: 2, isAdmin: true };

        jwt.sign(tokenPayload, secretKey, (err, token) => {

            if (err) {
                res.status(500).json({ message: 'Internal server error' });
            } else {

                res.cookie('token', token);
                res.redirect('/views/admins_page.html');
            }
        });
    } else {
        const query = 'SELECT * FROM users WHERE username = ? AND password = ? AND is_user = 0';
        const queryValues = [username, password];

        db.query(query, queryValues, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'Internal server error' });
            } else if (results.length > 0) {
                const tokenPayload = { userid: results[0].id, isAdmin: false };

                jwt.sign(tokenPayload, secretKey, (err, token) => {
                    if (err) {
                        res.status(500).json({ message: 'Internal server error' });
                    } else {
                        res.cookie('token', token);
                        res.redirect('/views/users_page.html')
                    }
                });
            } else {
                console.log('User not found!');
                res.status(401).json({ message: 'Invalid credentials' });
            }
        });
    }
}