const express = require('express');
const router = express.Router();

const testingController = require('../controllers/testing');

router.get('/project/:id', testingController.findProject);

module.exports = router;