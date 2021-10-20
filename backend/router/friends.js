const express = require('express');
const router = express.Router();

const friendsControllers = require('../controllers/friends');
const authorization = require('../middleware/authorization');

router.get('/allUsers',authorization,friendsControllers.allUsers);
router.get('/allFriends',authorization,friendsControllers.getAllFriends);
router.put('/addFriend/:id',authorization,friendsControllers.addFriend);
router.put('/removeFriend/:id',authorization,friendsControllers.removeFriend);

module.exports = router;