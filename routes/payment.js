const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment');
const isAuthenticated = require('../middleware/isAuthenticated');
// router.get('/:paymentId', paymentController);
router.post('/new', isAuthenticated, paymentController.addPayment);
router.get('/:paymentId/meta', isAuthenticated, paymentController.getPaymentMeta);

module.exports = router;