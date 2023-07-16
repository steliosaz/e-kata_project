const express = require('express');
const router = express.Router();
const path = require('path')
    //get methods
router.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '../views/welcome.html'));
});

router.route('/api/auth/register').get((req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'))
})

router.route('/api/auth/login').get((req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
})

// Logout route
router.route('/logout').get((req, res) => {
    res.clearCookie('token');
    res.redirect('/views/login.html'); // Redirect to the home page or any other desired page
});

router.route('/views/users_page.html').get((req, res) => {
    res.sendFile('users_page.html', { root: __dirname + '/views' });
});

router.route('/views/admins_page.html').get((req, res) => {
    res.sendFile('admins_page.html', { root: __dirname + '/views' });
});

module.exports = router;