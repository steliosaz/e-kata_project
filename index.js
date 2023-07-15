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
app.use(express.urlencoded({ extended: false})) // acess sta forms req.body.email etc.
app.use(cookieParser());
app.use((req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    res.cookie('token', token);
  }

  next();
});

//get methods
app.get('/', (req, res) => {
res.sendFile(__dirname + '/views/welcome.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html')
})

app.get('/login', (req, res) => {
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

// Handle the file upload
app.post('/upload', (req, res) => {
  try {
    const { fetch_date, products } = req.body;

    // Insert products into the Product table
    const productValues = products.map((product) => {
      const { id, name, category, subcategory } = product;
      return `('${id}', '${name}', '${category}', '${subcategory}')`;
    });

    const productInsertQuery = `
      INSERT INTO product (id, name, category, subcategory)
      VALUES ${productValues.join(', ')}
    `;

    db.query(productInsertQuery, (error, productResult) => {
      if (error) {
        console.error('Error inserting products:', error);
        res.status(500).json({ message: 'Error inserting data' });
        return;
      }

      // Insert prices into the Price table
      const priceValues = products.flatMap((product) => {
        const { id, prices } = product;
        return prices.map((price1) => {
          const { price, date } = price1;
          return `('${id}', '${price}', '${date}')`;
        });
      });

      const priceInsertQuery = `
        INSERT INTO price (product_id, value, date)
        VALUES ${priceValues.join(', ')}
      `;

      db.query(priceInsertQuery, (error, priceResult) => {
        if (error) {
          console.error('Error inserting prices:', error);
          res.status(500).json({ message: 'Error inserting data' });
          return;
        }

        res.status(200).json({ message: 'Data inserted successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting data' });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'AdminPass2023!') {
    const tokenPayload = { userid: 2, isAdmin: true };

    jwt.sign(tokenPayload, secretKey, (err, token) => {
      
      if (err) {
        res.status(500).json({ message: 'Internal server error' });
      } else {

        res.cookie('token',token);
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
        const tokenPayload = { userid: results[0].id , isAdmin: false };

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
});

app.post('/register',(req,res) => {
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
  db.query(`insert into users(username,password,email,is_user) values("${username}","${password}","${email}","0")`,(error)=>{
    if (error) {
      console.log(error);
      return res.status(500).send('An error occurred while registering the user.');
    }

    return res.status(200).send('User registered successfully.');
    
})
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});