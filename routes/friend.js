const express = require("express")
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const friendController = require("../controllers/friend");

router.post('/new', isAuthenticated, friendController.addFriend);
router.post('/fetch-all', friendController.getFriends);

module.exports = router;