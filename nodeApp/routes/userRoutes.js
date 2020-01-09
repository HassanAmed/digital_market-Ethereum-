const express = require('express');
const users = require('../controllers/userController');

const router = express.Router();

router.post('/setUser', users.setter);
router.get('/getUser', users.getter);
router.get('/allUsers', users.getall);

module.exports = router;
