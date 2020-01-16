const express = require("express")
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const groupController = require("../controllers/group");

router.post('/new', isAuthenticated, groupController.createGroup);
router.get('/group/:id', groupController.getGroup);

module.exports = router;