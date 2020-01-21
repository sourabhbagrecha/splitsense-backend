const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const expenseC = require("../controllers/expense");

router.post('/new', isAuthenticated, expenseC.addExpense);
router.get('/:id',isAuthenticated, expenseC.getExpense);
// router.post('/:expId', expenseC.updateExpense);
// router.delete('/:expId', expenseC.deleteExpense);

module.exports = router;