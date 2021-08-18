const mongoose = require('mongoose');
const articleImagesSchema = new mongoose.Schema({
    article: {
        type: mongoose.Schema.ObjectId,
        ref: 'Article'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    },
    public_id: {
        type: String,
        // required: true
    },
    url: {
        type: String,
        // required: true
    },
    idForImages: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('ArticleImages', articleImagesSchema)