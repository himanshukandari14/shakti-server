const express=require('express');
const { register } = require('../controllers/auth');
const { verifyOTP } = require('../controllers/otpController');
const router=express.Router();

// auth routes
router.post('/register',register);
// Verify OTP route
router.post('/verify-otp', verifyOTP);

module.exports=router;