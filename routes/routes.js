const express=require('express');
const { register, login } = require('../controllers/auth');
const { verifyOTP } = require('../controllers/otpController');
const { verifyToken } = require('../middleware/auth');
const router=express.Router();

// auth routes
router.post('/register',register);
router.post('/login',login);
// Verify OTP route
router.post('/verify-otp', verifyOTP);


// general routes
router.get('/dashboard',verifyToken, (req, res) => {
    res.send('Hello World! from dashbpard')
    });
    
module.exports=router;