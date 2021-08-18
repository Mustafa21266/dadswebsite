const Article = require('../models/article');
const ArticleImages = require('../models/articleImages');
const User = require('../models/user');
const Reservation = require('../models/reservation');
const Place = require('../models/place');
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
exports.createArticle = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let article = await Article.create(req.body)
        const myPromise = new Promise(async (resolve, reject) => {
            let response;
            let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
                {
                    folder: `dadswebsite/articles/${article._id}`
                },
                async function (error, resultObj) {
                    // console.log(error, result);
                    response = resultObj
                    article.articleCover = {
                        public_id: response.public_id,
                        url: response.secure_url
                    }
                    await article.save()
                    resolve(response)
                }
            );
            await streamifier.createReadStream(req.files["articleCover"].data).pipe(cld_upload_stream);
        });
        await myPromise.then(async data => {

            article = await Article.findById(article._id).populate('user')
            res.status(200).json({
                success: true,
                message: 'Article Created Successfully!',
                article
            })

        })
    }
}


exports.editArticle = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let newData = {
            articleHeadline: req.body.articleHeadline,
            articleIntro: req.body.articleIntro,
            articleHTML: req.body.articleHTML
        }
        let article = await Article.findByIdAndUpdate(req.params.id, newData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        article = await Article.findById(req.params.id)
        console.log(article)
        console.log(req.body.articleCover, article.articleCover.url)
        if (req.body.articleCover === article.articleCover.url) {

        } else {
            await cloudinary.v2.uploader.destroy(article.articleCover.public_id)
            const myPromise = new Promise(async (resolve, reject) => {
                let response;
                let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
                    {
                        folder: `dadswebsite/articles/${article._id}`
                    },
                    function (error, resultObj) {
                        // console.log(error, result);
                        response = resultObj
                        resolve(response);
                    }
                );
                await streamifier.createReadStream(req.files["articleCover"].data).pipe(cld_upload_stream);
            });
            myPromise.then(async (result) => {
                // console.log('asdasdasasdasdasdasddasd',result)
                article.articleCover = {
                    public_id: result.public_id,
                    url: result.secure_url
                }
                await article.save()
                article = await Article.findById(req.params.id).populate('user')
                res.status(200).json({
                    success: true,
                    message: 'Article Editied Successfully!',
                    article
                })
            })
        }

    }
}

exports.deleteArticle = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let article = await Article.findById(req.params.id)
        await cloudinary.v2.uploader.destroy(article.articleCover.public_id)
        let articleImages = await ArticleImages.find({ idForImages: article.idForImages })
        if (articleImages) {
            for (let i = 0; i < articleImages.length; i++) {
                await cloudinary.v2.uploader.destroy(articleImages[i].public_id)
                await articleImages[i].remove();
            }
        }
        await Article.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Article Deleted Successfully!',
            article
        })
    }
}


exports.searchArticles = async (req, res, next) => {
    // const user = await User.findById(req.body.user)
    // if (!user || user.role !== 'admin') {
    //     res.status(401).json({
    //         success: false,
    //         message: 'Unauthorized Action!',
    //     })
    // }
    console.log(req.query.searchTerm)
    let searchObj = {
        articleHeadline: {
            $regex: req.query.searchTerm,
            $options: 'i'
        },
        articleIntro: {
            $regex: req.query.searchTerm,
            $options: 'i'
        }
    }
    if (req.query.searchTerm !== "") {
        console.log("1")
        let articles = await Article.find(searchObj).sort({ 'createdAt': req.query.orderBy })
        res.status(200).json({
            success: true,
            articles
        })
    } else {
        console.log("2")
        let articles = await Article.find().sort({ 'createdAt': req.query.orderBy })
        res.status(200).json({
            success: true,
            articles
        })
    }

}



exports.addArticleImage = async (req, res, next) => {
    // console.log(req.body.user)
    // if(req.body.user === "undefined"){
    //     res.status(401).json({
    //         success: false,
    //         message: 'Unauthorized Action!',
    //     })
    // }
    const user = await User.findById(req.params.id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }
    let articleImage = await ArticleImages.create(req.body)
    const myPromise = new Promise(async (resolve, reject) => {
        let response;
        let cld_upload_stream = await cloudinary.v2.uploader.upload_stream(
            {
                folder: `dadswebsite/articles/images`
            },
            function (error, resultObj) {
                // console.log(error, result);
                response = resultObj
                resolve(response);
            }
        );
        await streamifier.createReadStream(req.files.articleImage.data).pipe(cld_upload_stream);
    });
    myPromise.then(async (result) => {
        // console.log('asdasdasasdasdasdasddasd',result)
        articleImage.public_id = result.public_id
        articleImage.url = result.secure_url
        articleImage.user = req.params.id
        await articleImage.save();
        return result.secure_url
    }).then(async (url) => {
        console.log("finaly")
        articleImage = await ArticleImages.findById(articleImage._id)
        return res.status(200).json({
            "link": url
        })
    })


}

exports.deleteArticleImage = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user || user.role !== 'admin') {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    }
    console.log(req.body)
    let articleImage = await ArticleImages.findOne({ url: req.body.src })
    if (articleImage) {
        console.log(articleImage)
        await cloudinary.v2.uploader.destroy(articleImage.public_id)
        await articleImage.remove();
        return res.status(200).json({
            success: true
        })
    }
}


exports.getAllArticles = async (req, res, next) => {
    const articles = await Article.find().populate('user').sort({ 'createdAt': -1 })
    if(articles){
        res.status(200).json({
            success: true,
            articles
        })
    }else {
        res.status(200).json({
            success: true,
            articles: []
        })
    }
}
//Get all users for ADMIN ONLY
exports.getAllUsers = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        const users = await User.find()
        if(users){
            res.status(200).json({
                success: true,
                users
            })
        }else {
            res.status(200).json({
                success: true,
                users: []
            })
        }
    }
}

//Get all reservations for ADMIN ONLY
exports.getAllReservations = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user || user.role !== 'admin') {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        const reservations = await Reservation.find().populate("user").populate("reservationDetails.place")
        if(reservations){
            res.status(200).json({
                success: true,
                reservations
            })
        }else {
            res.status(200).json({
                success: true,
                reservations: []
            })
        }
    }
}


exports.editUserDetailsAdmin = async (req, res, next) => {
    try {
        const userObj = await User.findById(req.user._id)
        if (!userObj || userObj.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized Action!',
            })
        } else {
            const user = await User.findById(req.params.id);
            user.name = req.body.name
            user.role = req.body.role
            user.phoneNo = req.body.phoneNo
            await user.save();
            res.status(200).json({
                success: true,
                message: 'User Details Updated Successfully!',
                user
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'An error has occured'
        })
    }
}



exports.deleteUserAdmin = async (req, res, next) => {
    try {
        const userObj = await User.findById(req.user._id)
        if (!userObj || userObj.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized Action!',
            })
        } else {
            const user = await User.findById(req.params.id);
            let reservations = await Reservation.find({ user: user._id })
            if (reservations) {
                for (let i = 0; i < reservations.length; i++) {
                    await reservations[i].remove();
                }
            }
            let places = await Place.find({ user: user._id })
            if (places) {
                for (let i = 0; i < places.length; i++) {
                    await places[i].remove();
                }
            }
            if (user.avatar.public_id) {
                await cloudinary.v2.uploader.destroy(user.avatar.public_id)
            }
            await user.remove();
            res.status(200).json({
                success: true,
                message: 'User Deleted Successfully!',
                user
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'An error has occured'
        })
    }
}


//Update Reservation Status FOR ADMINS
exports.updateReservationStatus = async (req, res, next) => {
    const userObj = await User.findById(req.user._id)
    if (!userObj || userObj.role !== 'admin') {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        const { status } = req.body;
        let reservation = await Reservation.findById(req.params.id).populate("user").populate("reservationDetails.place")
        reservation.status = status
        await reservation.save();
        if (status === "تم الحضور") {
            client.messages
                .create({
                    body: `شكرا لزيارتكم عيادات الدكتور صلاح الجوهري`,
                    from: '+18302436955',
                    to: '+201553786175'

                })
                .then(message => console.log(message.sid));
        } else if (status === "لم يتم الحضور") {
            // client.messages
            // .create({
            //     body: ` :
            //     ${name}
            //     يوم : ${newObj.reservationDetails.dayText}, ${newObj.reservationDetails.dayNumber}/${newObj.reservationDetails.month}/${newObj.reservationDetails.year}
            //     من ${newObj.reservationDetails.fromTime} إلي ${newObj.reservationDetails.toTime}
            //     في : ${placeObj.name} , ${placeObj.address}
            //     `,
            //     from: '+18302436955',
            //     to: '+201553786175'

            // })
            // .then(message => console.log(message.sid));
        }
        reservation = await Reservation.findById(req.params.id).populate("user").populate("reservationDetails.place")
        res.status(200).json({
            success: true,
            message: 'تم تعديل حاله الحجز بنجاح',
            reservation
        })
    }
}


//delete Reservation FOR ADMINS
exports.deleteReservation = async (req, res, next) => {
    const userObj = await User.findById(req.user._id)
    if (!userObj || userObj.role !== 'admin') {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Action!',
        })
    } else {
        let reservation = await Reservation.findById(req.params.id)
        await reservation.remove();
        res.status(200).json({
            success: true,
            message: 'تم مسح الحجز بنجاح',
            reservation
        })
    }
}