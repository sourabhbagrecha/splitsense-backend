const express = require('express');
const router = express.Router();

const expenseRoutes = require('./expense');
const testingRoutes = require('./testing');
const helperRoutes = require('./helper');
const friendRoutes = require('./friend');
const groupRoutes = require('./group');
const mainRoutes = require('./main');
const userRoutes = require('./user');
const paymentRoutes = require('./payment');

router.use('/', mainRoutes);
router.use('/expense', expenseRoutes);
router.use('/friend', friendRoutes);
router.use('/group', groupRoutes);
router.use('/user', userRoutes);
router.use('/helper', helperRoutes);
router.use('/testing', testingRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;