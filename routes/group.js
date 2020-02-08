const express = require("express")
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const groupController = require("../controllers/group");
const expenseController = require("../controllers/expense");

router.post('/new', isAuthenticated, groupController.createGroup);
router.get('/fetch-all', isAuthenticated, groupController.getGroups);
router.get('/:groupId', isAuthenticated, groupController.getGroup);
router.get('/participants/:groupId', isAuthenticated, groupController.getAddExpenseGroupParticipants);
// router.get('/:groupId/calculateTotals', groupController.calculateTotals);
router.post('/:groupId/expense/new', isAuthenticated, expenseController.addExpense);

module.exports = router;