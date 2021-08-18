const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    },
    name: {
        type: String,
        required: [true, "Please enter a name"]
    }
    ,
    reservationDetails: {
        place: {
            type: mongoose.Schema.ObjectId,
            ref: 'Place',
        },
        dayText: {
            type: String,
            trim: true,
            required: [true, "Please select a day"]
        },
        dayNumber: {
            type: String,
            trim: true,
            required: [true, "Please select a day"]
        },
        month: {
            type: String,
            trim: true,
            required: [true, "Please select a day"]
        },
        year: {
            type: String,
            trim: true,
            required: [true, "Please select a day"]
        },
        fromTime: {
            type: String,
            trim: true,
            required: [true, "Please select a fromTime"]
        },
        toTime: {
            type: String,
            trim: true,
            required: [true, "Please select a toTime"]
        }
    },
    additionalNotes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['قادم','تم الحضور','لم يتم الحضور','ملغي'],
            message: 'Please select correct status'
        },
        default: 'قادم'
    }
})

module.exports = mongoose.model('Reservation', reservationSchema)