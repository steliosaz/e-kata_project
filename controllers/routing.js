const express = require('express');
const router = express.Router();
const path = require('path');
const { adminAuthMiddleware } = require('../auth/auth');
const { userAuthMiddleware } = require('../auth/auth');
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
    res.sendFile(path.join(__dirname, '../views/login.html'))
});

router.route('/views/users_page.html').get(userAuthMiddleware,(req, res) => {
    res.sendFile(path.join(__dirname, '../views/users_page.html'))
});

router.route('/views/admins_page.html').get(adminAuthMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admins_page.html'));
});

module.exports = router;