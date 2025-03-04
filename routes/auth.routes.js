const express = require('express');
const router = express.Router();
const { signup, login, getProfile, refreshToken } = require('../controllers/auth.controller');
const { signupValidator, loginValidator } = require('../validators/auth.validator');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.get('/profile', authMiddleware, getProfile);
router.post('/refresh-token', refreshToken);
module.exports = router;