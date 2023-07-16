// requires
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');
const db = require('./services/connectdb');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { adminAuthMiddleware, userAuthMiddleware } = require('./auth/auth');

// initializations
const app = express();
const port = process.env.PORT;
const secretKey = process.env.SECRETKEY;

// uses
app.use(express.json());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false })) // acess sta forms req.body.email etc.
app.use(cookieParser());



app.use('/', require('./controllers/routing'))
app.use('/api/auth', require('./controllers/auth'))
app.use('/api/admin', require('./controllers/admin'))


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});