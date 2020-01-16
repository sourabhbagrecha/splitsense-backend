const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');

router.get('/', (req, res, next) => { return res.send("This is the landing page!") });

router.get('/home', mainController.getHome);

router.post('/group/new', mainController.createGroup);
router.get('/group/:id', mainController.getGroup);

router.post('/friend', mainController.addFriend);
router.get('/friend/:id', mainController.getFriend);

module.exports = router;