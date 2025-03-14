const express = require('express');
const {login, getUser, updateUser} = require('../controllers/authController');
const { extractToken, verifyToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/login',login);
router.get('/', extractToken, verifyToken, getUser);
router.put('/', extractToken, verifyToken, updateUser);
module.exports = router; 