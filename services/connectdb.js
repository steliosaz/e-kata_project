const mysql = require('mysql');
require('dotenv').config();
var db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT,
    timezone: 'Z'
});
db.connect(function(err) {
    if (err) {
        throw err
    }
    console.log("remote database connected");
});
module.exports = db;