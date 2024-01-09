const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', userController.registerUser);

// Get user profile
router.get('/:id', authenticateToken, userController.getUserProfile);

// Update user profile
router.put('/:id', authenticateToken, userController.updateUserProfile);

// Delete a user
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;