const express = require('express');
const ReviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
const router = express.Router({mergeParams:true});

router
    .route('/')
    .get(ReviewController.getAllReviews)
    .get(ReviewController.getTourReview)
    .post( ReviewController.createReview)

router
    .route('/:id')
    .delete(ReviewController.deleteReview)

module.exports = router;