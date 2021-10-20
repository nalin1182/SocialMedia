const express = require('express');
const router = express.Router();

router.use('/auth',require('./auth'));
router.use('/posts',require('./Posts'));
router.use('/friends',require('./friends'));

module.exports = router;