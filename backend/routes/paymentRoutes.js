const express = require('express');
const router = express.Router();
const { verifyRazorpay, paymentStripe } = require('../controllers/paymentController');
const protect = require('../middlewares/authMiddleware');

router.post('/razorpay/verify', protect, verifyRazorpay);
router.post('/stripe', protect, paymentStripe);

module.exports = router;
