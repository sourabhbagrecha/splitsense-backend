const express = require("express")
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const friendController = require("../controllers/friend");

router.post('/new', isAuthenticated, friendController.addFriend);
router.get('/fetch-all', isAuthenticated, friendController.getFriends);
router.get('/get-general-data/:id', isAuthenticated, friendController.getGeneralData);
router.get('/:id', isAuthenticated, friendController.getFriend);

module.exports = router;