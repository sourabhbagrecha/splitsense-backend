const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');

router.get('/', (req, res, next) => { return res.send("This is the landing page!") });
router.get('/home', mainController.getHome);

module.exports = router;