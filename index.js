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

//get methods
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/welcome.html');
});

app.get('/api/auth/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html')
})

app.get('/api/auth/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})

// Logout route
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/views/login.html'); // Redirect to the home page or any other desired page
});

app.get('/views/users_page.html', userAuthMiddleware, (req, res) => {
    res.sendFile('users_page.html', { root: __dirname + '/views' });
});

app.get('/views/admins_page.html', adminAuthMiddleware, (req, res) => {
    res.sendFile('admins_page.html', { root: __dirname + '/views' });
});


app.use('api/auth', require('./controllers/auth'))
app.use('api/admin', require('./controllers/admin'))


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});