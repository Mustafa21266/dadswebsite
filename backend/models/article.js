const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    articleHeadline: {
        type: String,
        trim: true,
        required: [true, 'Please Enter article headline!'],
        maxlength: [150, 'Name cannot exceed 150 characters']
    },
    articleIntro: {
        type: String,
        trim: true,
        required: [true, 'Please Enter article Intro!'],
        maxlength: [250, 'Name cannot exceed 250 characters']
    },
    articleHTML: {
        type: String,
        required: [true, 'Please enter article content!'],
    },
    articleCover: {
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
    idForImages: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('Article', articleSchema)