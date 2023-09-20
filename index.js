// requires
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');
const db = require('./services/connectdb');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const CircularJSON = require('circular-json');
const { adminAuthMiddleware, userAuthMiddleware } = require('./auth/auth');

// initializations
const app = express();
const port = process.env.PORT;
const secretKey = process.env.SECRETKEY;

// uses
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false })) // acess sta forms req.body.email etc.
app.use(cookieParser());



app.use('/', require('./controllers/routing'))
app.use('/api/auth', require('./controllers/auth'))
app.use('/', require('./controllers/admin'))
app.use('/', require('./controllers/users'))
app.use('/icons', express.static('icons'));

app.get('/redirectToMap', (req, res) => {
  res.sendFile(__dirname + '/views/map.html');
});

app.get('/redirectToGraphs', (req, res) => {
  res.sendFile(__dirname + '/views/graphs_page.html');
});

app.get('/redirectToOffersByMonth', (req, res) => {
  res.sendFile(__dirname + '/views/offers_by_month.html');
});

app.get('/redirectToDailyDiscounts', (req, res) => {
  res.sendFile(__dirname + '/views/daily_discount.html');
});

app.get('/redirectToLeaderBoard', (req, res) => {
  res.sendFile(__dirname + '/views/leaderboard.html');
});

app.get('/rate_offers', (req, res) => {
  const shopname = req.query.ShopName;
  res.sendFile(__dirname + '/views/rate_offers.html');
});


app.get('/offers_history', (req, res) => {
  res.sendFile(__dirname + '/views/offers_history.html');
});

app.get('/change', (req, res) => {
  res.sendFile(__dirname + '/views/change_credentials.html');
});

app.get('/action_history', (req, res) => {
  res.sendFile(__dirname + '/views/actions_history.html');
});

app.get('/upload_page', (req, res) => {
  res.sendFile(__dirname + '/views/upload_page.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});