const express = require('express');
const router = express.Router();
const postsController = require('../controllers/Posts');

const authorization = require('../middleware/authorization');

//authentication routes
router.get('/allPosts',authorization,postsController.getAllPosts);
router.post('/createPosts',authorization,postsController.createPosts);
router.delete('/deletePosts/:id',authorization,postsController.deletePosts);
router.put('/updatePosts/:id',authorization,postsController.editPosts);

module.exports = router;