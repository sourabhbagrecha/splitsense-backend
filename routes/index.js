const express = require('express');
const router = express.Router();

const mainRoutes = require('./main');
const expenseRoutes = require('./expense');

router.use('/', mainRoutes);
router.use('/expense', expenseRoutes);

module.exports = router;