const express = require("express");
const router = express.Router();
const { 
    createArticle,
    getAllArticles,
    addArticleImage,
    deleteArticleImage,
    editArticle,
    deleteArticle,
    searchArticles,
    getAllUsers,
    getAllReservations,
    editUserDetailsAdmin,
    deleteUserAdmin,
    updateReservationStatus,
    deleteReservation
} = require('../controllers/adminController');
const { 
    createPlace,
    editPlace,
    deletePlace,
    getAllPlaces
} = require("../controllers/placeController");
const auth = require("../middlewares/auth");

router.route('/admin/article/create').post(auth, createArticle)
router.route('/admin/article/update/:id').put(auth, editArticle)
router.route('/admin/article/delete/:id').delete(auth, deleteArticle)
router.route('/admin/article/images/upload/:id').post(auth, addArticleImage)
router.route('/admin/article/images/delete/:id').post(auth, deleteArticleImage)
router.route('/articles/all').get(getAllArticles)
router.route('/articles/search').get(searchArticles)
router.route('/admin/places/create').post(auth, createPlace)
router.route('/admin/places/update/:id').put(auth, editPlace)
router.route('/admin/places/delete/:id').delete(auth, deletePlace)



router.route('/getAllPlaces').get(getAllPlaces)
router.route('/admin/users/all').get(auth, getAllUsers)
router.route('/admin/reservations/all').get(auth, getAllReservations)
router.route('/admin/user/update/:id').put(auth, editUserDetailsAdmin)
router.route('/admin/user/delete/:id').delete(auth, deleteUserAdmin)


router.route('/admin/reservation/update/:id').put(auth, updateReservationStatus)
router.route('/admin/reservation/delete/:id').delete(auth, deleteReservation)


module.exports = router;