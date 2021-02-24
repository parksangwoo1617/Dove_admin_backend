const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const authController = require('../controller/auth');
const checkAdmin = require('../middleware/checkAdmin');
const errorHandler = require('../middleware/errorHandler');

const loginRouter = (authController.login);
const logoutRouter = errorHandler(authController.logout);

router.post('/login', loginRouter);
router.get('/logout', verifyToken, checkAdmin, logoutRouter);

module.exports = router;