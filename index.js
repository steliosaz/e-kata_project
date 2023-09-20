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
const { offers_expired } = require('./user/offers_expired');

//check and deleteFunction
function checkAndDeleteExpiredOffers(){
  const currentDate = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format
  console.log('currentDate',currentDate)
  offers_expired(currentDate)
}
cron.schedule('0 0 0 1 * *', () => {
  console.log('Running checkAndDeleteExpiredOffers at midnight the first day of the month.');
  checkAndDeleteExpiredOffers();
});
//token function

// Your tokens_crafter function without the scheduling and isLastDayOfMonth() check
function tokens_crafter() {
  console.log("tokens crafter triggered");
  
  MapCreator().then(() => {
  let total_score = 0;
  let total_users = 0;
  const mapObj = Object.fromEntries(userMap);
  fetch(`/api/get_users`)
  .then(response => response.json())
  .then(all_users => {

      all_users.forEach(user => {
          total_score += user.monthly_score;
          total_users += 1;
      });
      
      let all_tokens = (total_users - 1) * 100;
      let token_value_per_score = (0.8 * all_tokens) / total_score;
      console.log('total_score', total_score);
      console.log('total_users', total_users);
      console.log('token_value_per_score', token_value_per_score);

      all_users.forEach(user => {
        const tokens = Math.round(user.monthly_score * token_value_per_score);
        user.tokens = tokens;  // Assigning the calculated tokens to the user object for logging or other purposes
              
        if (mapObj.hasOwnProperty(user.user_name)) {
            // Append tokens at the end of existing array
            mapObj[user.user_name].push(tokens);  
        } else {
            // Create a new array with tokens if the user does not exist in the map
            mapObj[user.user_name] = [tokens];
        }

});
      
      console.log('mapObj',mapObj)
      fetch('/api/tokens_crafter', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userMap: mapObj })
      }).then(response => response.json())
      .then(data => {
      console.log(data);
      })
      .catch(error => {
      console.log(error);
      });

  })
  .catch(error => {
      console.error('Error fetching users:', error);
  });
})
  
}
cron.schedule('0 0 0 1 * *', () => {
  console.log('Running tokens_crafter at midnight the first day of the month.');
  tokens_crafter();
});

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