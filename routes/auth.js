const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/local/register', authController.localRegister);
router.post('/local/login', authController.localLogin);
router.post('/google/login', authController.googleAuth);

module.exports = router;