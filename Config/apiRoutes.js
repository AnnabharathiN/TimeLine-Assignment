const express = require('express');
const router = express.Router();
const apiController = require('../apiController/apiController');
//POST API ROUTES
router.get('/api/get-posts', apiController.getAllPosts);
router.post('/api/create-post', apiController.postOnePost);
router.put('/api/edit-post/:id', apiController.updateOnePost);
router.delete('/api/delete-post/:id', apiController.deleteOnePost);
//COMMENT API ROUTES
router.get('/api/get-post-comment/:id', apiController.getPostComments);
router.post('/api/post-post-comment/:id', apiController.postComment);

module.exports = router;