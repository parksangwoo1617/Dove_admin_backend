const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const authController = require('../controller/auth');
const checkAdmin = require('../middleware/checkAdmin');
const errorHandler = require('../middleware/errorHandler');

const loginRouter = (authController.login);
const logoutRouter = errorHandler(authController.logout);
const isLoggedIn = authController.isLoggedIn;

router.post('/login', loginRouter);
router.get('/logout', isLoggedIn, logoutRouter);

module.exports = router;