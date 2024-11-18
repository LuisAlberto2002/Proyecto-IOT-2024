const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/loginController');

// Middleware to parse JSON
router.use(express.json());

// Routes for login and signup
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
