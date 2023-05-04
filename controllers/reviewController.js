const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async(req,res,next)=>{
    // call review of particular tour
    let filter = {};
    if(req.params.tourId) filter = {tour: req.params.tourId};

    const review = await Review.find(filter);
    res.status(200).json({
        status:'success',
        results: review.length,
        data:{
            review
        }
    });
});

exports.getTourReview = catchAsync(async(req,res,next)=>{
    const review = await Review.findById(req.params.id);
    res.status(200).json({
        status:'success',
        results: review.length,
        data:{
            review
        }
    });
});

exports.createReview = catchAsync(async(req,res,next)=>{
    // Allow nested routes
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
    const newReview = await Review.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            newReview
        }
    });
});

exports.deleteReview = factory.deleteOne(Review);