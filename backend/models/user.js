const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Enter your name!'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    phoneNo: {
        type: String,
        required: [true, 'Please Enter your phoneNo!'],
        unique: true,
        trim: true,
        maxlength: [15, 'phoneNo cannot exceed 15 numbers']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password!'],
        minLength: [6, 'Password cannot be less than 6 characters!'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    role: {
        type: String,
        required: [true, 'Please enter a role!'],
        enum: {
            values: ['admin','secretary','user'],
            message: 'Please select correct role'
        },
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})


//Password Encryption before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})
//Compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//Geenerate password reset token
userSchema.methods.getResetPasswordToken = function(){
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //set token expiry time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken
}

module.exports = mongoose.model('User', userSchema)