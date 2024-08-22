const { generateToken } = require('../middleware/auth');
const UserModel = require('../models/User');
const { generateOTP, sendOTP } = require('../utils/otp');
const User= require('../models/User');
const bcrypt=require('bcrypt');

exports.register= async(req,res)=>{
    try {
        // fetch data
        const { name, email, password } = req.body;

        const userExists=await UserModel.findOne({email});
        if(userExists){
            return res.status(400).json({message:"Email already exists"})
            }



        // generate otp
         const otp = generateOTP();

         const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

        //  hash pass
        const hashedPass=await bcrypt.hash(password,10);

         const user = new User({
            name,
            email,
            password:hashedPass,
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


// login
exports.login= async(req,res)=>{
    try {
        // fetch
        const {email,password}=req.body;

        // validate
        if(!(email,password)){
            return res.status(400).json({
                success:false,
                message:'please fill both email and password',
            })
        }

        // find user
        const userExists= await UserModel.findOne({email});

        if(!userExists){
            return res.status(404).json({
                success:false,
                message:'User not found',
                })   

        }

        // match password
        const isMatch = await bcrypt.compare(password, userExists.password);
        console.log(userExists.password);

         if(!isMatch){
            return res.status(403).json({
                success: false,
                message:'email or password is invalid'
            })
        }


         // make payload
        const payload={
            id:userExists.id,
            username:userExists.email,
        };

           console.log('payload is =>',payload);
        const token = generateToken(payload);


         return res.json({
            token,
            userExists,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error logging in user',
            details: error.message

        })
    }
}