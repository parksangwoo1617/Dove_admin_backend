const express = require('express');

const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const errorHandler = require('../middleware/errorHandler');
const checkAdmin = require('../middleware/checkAdmin');

const adminController = require('../controller/admin');

const getPostDetailRouter = errorHandler(adminController.getPostDetail); 
const createPostRouter = errorHandler(adminController.createPost);
const updatePostRouter = errorHandler(adminController.updatePost);
const deletePostRouter = errorHandler(adminController.deletePost);

router.get('/get/:id', getPostDetailRouter);
router.post('/post', createPostRouter);
router.patch('/update/:id', verifyToken, checkAdmin, updatePostRouter);
router.delete('/delete/:id', verifyToken, checkAdmin, deletePostRouter);

module.exports = router;