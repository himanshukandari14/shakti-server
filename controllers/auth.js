const User = require('../models/User');
const { generateOTP, sendOTP } = require('../utils/otp');

exports.register= async(req,res)=>{
    try {
        // fetch data
        const { name, email, password } = req.body;


        // generate otp
         const otp = generateOTP();

         const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

         const user = new User({
            name,
            email,
            password,
            otp,
            otpExpires,
    });

    await user.save();
    await sendOTP(email, otp);

    res.status(200).json({ message: 'Registration successful. OTP sent to email.' });

    } catch (error) {
         res.status(500).json({ error: 'Error registering user', details: error.message });
    }
}