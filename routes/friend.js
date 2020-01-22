const express = require("express")
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const friendController = require("../controllers/friend");
const expenseController = require("../controllers/expense");

router.get('/fetch-all', isAuthenticated, friendController.getFriends);
router.get('/group-meta', isAuthenticated, friendController.getFriendsForGroup);
router.get('/:id', isAuthenticated, friendController.getFriend);
router.get('/:friendId/:id',isAuthenticated, expenseController.getExpense);
router.post('/new', isAuthenticated, friendController.addFriend);
router.post('/:friendId/expense/new', isAuthenticated, expenseController.addExpense);

module.exports = router;