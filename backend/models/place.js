const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please Enter place name!']
    },
    googleRating: {
        type: Number,
        // required: [true, 'Please Enter google Rating!']
    },
    description: {
        type: String,
        required: [true, 'Please enter place description!']
    },
    address: {
        type: String,
        required: [true, 'Please enter place address!']
    },
    placeCover: {
        name: {
            type: String,
            // required: true
        },
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    placeLogo: {
        name: {
            type: String,
            // required: true
        },
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    workingDays: [
        {
            day: {
                type: String,
                // required: true
            },
            fromTime: {
                type: String,
                // required: true
            },
            toTime: {
                type: String,
                // required: true
            }
        }
        
    ],
    clinicNumberOne: {
        type: String,
        required: [true, 'Please Enter a first clinic Number!']
    },
    clinicNumberTwo: {
        type: String,
        required: [true, 'Please Enter a second clinic Number!']
    },
    reservationPrice: {
        type: Number,
        required: [true, 'Please Enter a reservationPrice!']
    },
    placeImages: [{
            public_id: {
                type: String,
                // required: true
            },
            url: {
                type: String,
                // required: true
            }
        }]
})



module.exports = mongoose.model('Place', placeSchema)