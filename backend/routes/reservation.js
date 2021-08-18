const express = require("express");
const router = express.Router();
const { 
    createReservation,
    getAllReservations,
    getAllUserReservations,
    cancelReservation
} = require('../controllers/reservationController');

const auth = require("../middlewares/auth");

router.route('/reservations/create').post(auth, createReservation)
router.route('/reservations/me/all').get(auth, getAllUserReservations)

router.route('/me/reservation/cancel/:id').put(auth, cancelReservation)




//TODO: FOR ADMIN DASHBOARD
router.route('/reservations/all').get(auth, getAllReservations)





module.exports = router;