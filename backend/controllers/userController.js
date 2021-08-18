const User = require('../models/user');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const fetch = require('node-fetch')
const reviews_vezeeta = require('../utils/reviews_vezeeta.json')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const streamifier = require('streamifier');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
exports.getVezeetaReviews = async (req, res, next) => {
    // console.log(require('crypto').randomBytes(10).toString('hex'))
    reviews_vezeeta.forEach(review => {
        review._id = require('crypto').randomBytes(10).toString('hex')
    })
    // fetch('../utils/reviews_vezeeta.json')
    // .then(resp=> resp.json()).then(data => console.log(data)) ; 
    console.log(reviews_vezeeta[0]._id)
    res.status(200).json({
        success: true,
        message: 'Working!',
        reviews: reviews_vezeeta
    })
}

exports.registerUser = async (req, res, next) => {
    try {
        if(req.body.phoneNo){
            req.body.phoneNo = String(req.body.phoneNo)
        }
        const user = await User.create(req.body);
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)
            const options = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.status(200).cookie('token',token, options).json({
                success: true,
                token,
                message: 'Logged in successfully!',
                user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'An error has occured'
        })
    }
}
exports.loginUser = async (req, res, next) => {
    try{
        const { phoneNo, password } = req.body;
        console.log(phoneNo)
    let user = await User.findOne({ phoneNo: phoneNo}).select("+password")
    if(user){
        let isCorrectPassword = await bcrypt.compare(password, user.password)
        if(isCorrectPassword){
            //IMPORTANT [[[[[[[[[[[[[[[[[[[USER]]]]]]]]]]]]]]]]]]]
            const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)
            const options = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            user = await User.findOne({ phoneNo: phoneNo})
            res.status(200).cookie('token',token, options).json({
                success: true,
                token,
                message: 'Logged in successfully!',
                user
            })
        }
    }else {
        res.status(401).json({
            success: false,
            message: "PhoneNo & Passwords don't match"
        })
    }
    }catch(err){
        res.status(500).json({
            success: false,
            message: "An error has ocurred"
        })
    }
    
}

exports.getUserDetails = async (req, res, next) => {
    try{
        console.log(req._id)
    let user = await User.findOne({ _id: req.user._id})
    if(user){
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(200).cookie('token',token, options).json({
            success: true,
            token,
            message: 'Logged in successfully!',
            user
        })
    }else {
        res.status(404).json({
            success: false,
            message: "No user logged in"
        })
    }
    }catch(err){
        res.status(500).json({
            success: false,
            message: "An error has ocurred"
        })
    }
    
}



exports.logoutUser = async (req, res, next) => {
    const userObj = await User.findById(req.user._id)
    if (!userObj) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }else {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logged out Successfully!"
        })
    }

}


//Forgot Password       =>    /api/v1/password/forgot

exports.forgotPassword = async (req, res, next) => {
    console.log(req.body.phoneNo)
    console.log({ phoneNo: '+201553786175' })
    const { phoneNo } = req.body;
    const user = await User.findOne({ phoneNo: phoneNo});
    console.log(user)
    if(!user){
         return res.status(404).json({
            success: false,
            message: 'لا يوجد مستخدم بهذا الرقم!',
        })
    }
    //Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //Create reset password URL
    const resetURL = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`
    // const resetURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message = `Your password reset URL is:\n\n${resetURL}\n\nif you haven't requested a password reset please ignore this message!`;
    try {
        client.messages
            .create({
                body: message,
                from: '+19723626780',
                to: user.phoneNo

            })
            .then(message => {
                console.log(message.sid)
            
            });
        res.status(200).json({
            success: true,
            message: `Password Reset Link Successfully Sent To ${user.phoneNo}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return res.status(500).json({
            success: false,
            message: 'حدث خطأ ما!',
        })
    }

}

//Reset Password       =>    /api/v1/password/reset/:token

exports.resetPassword = async (req, res, next) => {
    //HASH URL Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    let user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if(!user){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }
    if(req.body.password !== req.body.confirmPassword){
        return res.status(401).json({
            success: false,
            message: "PhoneNo & Passwords don't match"
        })
    }
    //Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)
            const options = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            user = await User.findById(user._id)
            res.status(200).cookie('token',token, options).json({
                success: true,
                token,
                message: 'Logged in successfully!',
                user
            })
}



exports.avatarChange = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }else {
        const image_id = user.avatar.public_id
        if(user.avatar.public_id){
            await cloudinary.v2.uploader.destroy(image_id)
        }
        let myPromise = new Promise(async (resolve, reject) => {
            let response;
            let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
                {
                    folder: `dadswebsite/avatars/${user._id}`,
                    width: 500,
                    crop: 'scale'
                },
                function (error, resultObj) {
                    // console.log(error, result);
                    response = resultObj
                    console.log(response)
                    resolve(response);
                }
            );
            await streamifier.createReadStream(req.files.avatar.data).pipe(cld_upload_stream);
        });
        await myPromise.then(async (result) => {
            // console.log('asdasdasasdasdasdasddasd',result)
            user.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            }
            await user.save();
            res.status(200).json({
                success: true,
                message: "Avatar updated successfully!",
                avatar: user.avatar
            })
        })
        // res.cookie('token', null, {
        //     expires: new Date(Date.now()),
        //     httpOnly: true
        // })
        
    }
}


exports.editUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }else {
        console.log(req.body.password, req.body.confirmPassword)
        if(req.body.password === req.body.confirmPassword){
            const user = await User.findById(req.params.id);
            user.name = req.body.name
            user.password = req.body.password
            await user.save();
            res.status(200).json({
                success: true,
                message: 'User Details Updated Successfully!',
                user
            })
        }else {
            res.status(401).json({
                success: false,
                message: "Password and Confirm Password Don't Match!"
            })
        }
    }  
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'An error has occured'
        })
    }
}