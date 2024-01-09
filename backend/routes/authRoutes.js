const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register - Register a new user
router.post('/register', authController.registerUser);

// POST /api/auth/login - Authenticate a user and return a token
router.post('/login', authController.loginUser);

module.exports = router;