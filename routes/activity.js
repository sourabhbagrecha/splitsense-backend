const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const activityC = require("../controllers/activity");

router.get('/fetch-all', isAuthenticated, activityC.getAllActivities);

module.exports = router;