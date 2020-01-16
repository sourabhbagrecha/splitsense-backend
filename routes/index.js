const express = require('express');
const router = express.Router();

const mainRoutes = require('./main');
const expenseRoutes = require('./expense');
const friendRoutes = require('./friend');
const groupRoutes = require('./group');
const userRoutes = require('./user');
const helperRoutes = require('./helper');

router.use('/', mainRoutes);
router.use('/expense', expenseRoutes);
router.use('/friend', friendRoutes);
router.use('/group', groupRoutes);
router.use('/user', userRoutes);
router.use('/helper', helperRoutes);

module.exports = router;