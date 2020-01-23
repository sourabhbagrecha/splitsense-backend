const express = require("express")
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const friendController = require("../controllers/friend");
const expenseController = require("../controllers/expense");

router.get('/fetch-all', isAuthenticated, friendController.getFriends);
router.get('/group-meta', isAuthenticated, friendController.getFriendsForGroup);
router.get('/participants/:friendId', isAuthenticated, friendController.getAddExpenseFriendParticipants);
router.post('/new', isAuthenticated, friendController.addFriend);
router.get('/:id', isAuthenticated, friendController.getFriend);
router.post('/:friendId/expense/new', isAuthenticated, expenseController.addExpense);
router.get('/:friendId/:id',isAuthenticated, expenseController.getExpense);

module.exports = router;