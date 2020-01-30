const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/new', userController.addUser);
router.get('/get-meta/:userId', userController.getMeta);
router.post('/get-many-meta', userController.getMetaFromArray);

module.exports = router;