const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const expenseC = require("../controllers/expense");

router.post('/new', expenseC.addExpense);
// router.get('/:expId', expenseC.getExpense);
// router.post('/:expId', expenseC.updateExpense);
// router.delete('/:expId', expenseC.deleteExpense);

module.exports = router;