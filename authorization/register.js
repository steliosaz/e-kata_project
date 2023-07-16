const db = require('../services/connectdb');
const jwt = require('jsonwebtoken');

exports.register = async(req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    if (password.length < 8) {
        return res.status(400).send("Password should be at least 8 characters long.");

    }

    // Check if password has at least one capital letter, one number, and one symbol
    var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).send("Password should contain at least one capital letter, one number, and one symbol.");
    }
    db.query(`insert into users(username,password,email,is_user) values("${username}","${password}","${email}","0")`, (error) => {
        if (error) {
            console.log(error);
            return res.status(500).send('An error occurred while registering the user.');
        }

        return res.status(200).send('User registered successfully.');

    })
}