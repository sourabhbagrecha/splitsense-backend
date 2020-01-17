const express = require("express")
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const helperController = require("../controllers/helper");

router.post('/find-by-googleid', helperController.findUserByGoogleId);
router.post('/check-friendship', helperController.checkFriendship);
router.post('/check-user-existence', helperController.checkUserExistenceWithEmail);
router.post('/send-invitation', helperController.sendAnInvite);

module.exports = router;