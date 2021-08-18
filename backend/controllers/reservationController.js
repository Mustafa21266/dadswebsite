const Reservation = require('../models/reservation');
const User = require('../models/user');
const Place = require('../models/place');
const crypto = require('crypto');
const fetch = require('node-fetch')
const reviews_vezeeta = require('../utils/reviews_vezeeta.json')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const streamifier = require('streamifier');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


//Create a Place
exports.createReservation = async (req, res, next) => {
    const userObj = await User.findById(req.user._id)
    if (!userObj) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        const { name, place, reservationDetails, additionalNotes } = req.body;
        const newObj = {
            user: req.user._id,
            name,
            place,
            reservationDetails: JSON.parse(reservationDetails),
            additionalNotes
        }
        let reservation = await Reservation.create(newObj)
        let placeObj = await Place.findById(newObj.reservationDetails.place)
        reservation = await Reservation.findById(reservation._id).populate('user').populate('reservationDetails.place')
        console.log(placeObj)
        client.messages
            .create({
                body: `تم تأكيد الحجز بأسم :
                ${name}
                يوم : ${newObj.reservationDetails.dayText}, ${newObj.reservationDetails.dayNumber}/${newObj.reservationDetails.month}/${newObj.reservationDetails.year}
                من ${newObj.reservationDetails.fromTime} إلي ${newObj.reservationDetails.toTime}
                في : ${placeObj.name} , ${placeObj.address}
                `,
                from: '+19723626780',
                to: reservation.user.phoneNo

            })
            .then(async message => {
                console.log(message)
                await client.messages.create({
                    body: `تم تأكيد الحجز بأسم :
                ${name}
                يوم : ${newObj.reservationDetails.dayText}, ${newObj.reservationDetails.dayNumber}/${newObj.reservationDetails.month}/${newObj.reservationDetails.year}
                من ${newObj.reservationDetails.fromTime} إلي ${newObj.reservationDetails.toTime}
                في : ${placeObj.name} , ${placeObj.address}
                `,
                    from: '+19723626780',
                    to: '+201002229745'

                }).then(async message => {
                    console.log(message)
                })
            });
        reservation = await Reservation.findById(reservation._id).populate('user').populate('reservationDetails.place')
        res.status(200).json({
            success: true,
            message: 'تم تسجيل الحجز بنجاح',
            reservation
        })
    }
}





//Get All User Reservations
exports.getAllUserReservations = async (req, res, next) => {
    const userObj = await User.findById(req.user._id)
    if (!userObj) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let reservations = await Reservation.find({ user: req.user._id }).populate('user').populate("reservationDetails.place")
        res.status(200).json({
            success: true,
            reservations
        })
    }
}



//cancel Reservation
exports.cancelReservation = async (req, res, next) => {
    const userObj = await User.findById(req.user._id)
    let reservation = await Reservation.findById(req.params.id).populate('user').populate('reservationDetails.place')
    if (!userObj || String(reservation.user._id) !== String(userObj._id)) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        reservation.status = "ملغي"
        await reservation.save();
        client.messages
            .create({
                body: `تم الغاء الحجز بأسم :
            ${reservation.name}
            يوم : ${reservation.reservationDetails.dayText}, ${reservation.reservationDetails.dayNumber}/${reservation.reservationDetails.month}/${reservation.reservationDetails.year}
            من ${reservation.reservationDetails.fromTime} إلي ${reservation.reservationDetails.toTime}
            في : ${reservation.reservationDetails.place.name} , ${reservation.reservationDetails.place.address}
            `,
                from: '+19723626780',
                to: reservation.user.phoneNo

            })
            .then(async message => {
                console.log(message.sid)
                client.messages
            .create({
                body: `تم الغاء الحجز بأسم :
            ${reservation.name}
            يوم : ${reservation.reservationDetails.dayText}, ${reservation.reservationDetails.dayNumber}/${reservation.reservationDetails.month}/${reservation.reservationDetails.year}
            من ${reservation.reservationDetails.fromTime} إلي ${reservation.reservationDetails.toTime}
            في : ${reservation.reservationDetails.place.name} , ${reservation.reservationDetails.place.address}
            `,
                from: '+19723626780',
                to: '+201002229745'

            })
            .then(message => {
                console.log(message.sid)
            
            });
            
            });
        reservation = await Reservation.findById(req.params.id).populate('user').populate('reservationDetails.place')
        res.status(200).json({
            success: true,
            message: 'تم إلغاء الحجز بنجاح',
            reservation
        })
    }
}




//Get All Reservations FOR ADMINS
exports.getAllReservations = async (req, res, next) => {
    let reservations = await Reservation.find().populate('user')
    res.status(200).json({
        success: true,
        reservations
    })
}
