const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const errorHandler = require('../middleware/errorHandler');
const checkAdmin = require('../middleware/checkAdmin');
const isLoggedIn = require('../controller/auth').isLoggedIn;

const adminController = require('../controller/admin');

const getPostRouter = errorHandler(adminController.getPost);
const getPostDetailRouter = errorHandler(adminController.getPostDetail); 
const createPostRouter = errorHandler(adminController.createPost);
const updatePostRouter = errorHandler(adminController.updatePost);
const deletePostRouter = errorHandler(adminController.deletePost);

router.get('/get', getPostRouter);
router.get('/get/:id', getPostDetailRouter);
router.post('/post', createPostRouter);
router.patch('/update/:id', verifyToken, isLoggedIn, updatePostRouter);
router.delete('/delete/:id', verifyToken, isLoggedIn, deletePostRouter);

module.exports = router;