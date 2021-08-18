const express = require("express");
const router = express.Router();
const { getVezeetaReviews,
    registerUser,
    loginUser,
    logoutUser,
    avatarChange,
    editUserDetails,
    getUserDetails, 
    forgotPassword, 
    resetPassword,
} = require('../controllers/userController');

const auth = require("../middlewares/auth");

router.route('/getVezeetaReviews').get(getVezeetaReviews)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(auth, logoutUser)
router.route('/getUserDetails').get(auth, getUserDetails)
router.route('/avatar/change/:id').post(auth, avatarChange)
router.route('/me/update/:id').put(auth, editUserDetails)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)








module.exports = router;