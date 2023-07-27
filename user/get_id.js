const db = require('../services/connectdb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
secretKey = process.env.SECRETKEY

exports.get_id = async (req, res, next) => {
    const token = req.cookies.token;
    let decoded; // define the variable in a higher scope

    try {
        decoded = jwt.verify(token, secretKey);
        console.log('decoded_id:',decoded.userid);
        res.status(200).json({ decodedId: decoded.userid }); // 
    } catch (err) {
        console.error(err);
        res.status(401).send('Invalid token');
    }
};