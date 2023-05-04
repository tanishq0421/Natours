const AppError = require('../utils/appError');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');


exports.getAllTours = catchAsync(async (req, res, next) => {
    // const tours = await Tour.find({
        //     difficulty: 'easy',
        //     duration: 5
        // }
        // );
        // const tours = await Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy');
    
    // Build Query
    // 1A) Filtering
    const queryObj = {...req.query};
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    
    // 1B) Advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));
    
    
    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting 
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        console.log(sortBy);
        query = query.sort(sortBy);
    }else{
        query = query.sort('-createdAt');
    }

    // 3) Fields limiting
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    }else{
        query = query.select('-__v');
    }

    // 4) Pagination
    const page = req.query.page*1 || 1;
    const limit = req.query.limit*1 || 100;
    const skip = (page-1)*limit; 

    query = query.skip(skip).limit(limit);

    if(req.query.page){
        const numTours = await Tour.countDocuments()
        if(skip >= numTours) 
        throw new Error(`This page doesn't exist`);
    }

    // execute query
    const tours = await query;
    
    // Send Response
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestedAt: req.requestTime,
        data: {
            tours

        }
    });
});

exports.getTours = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id).populate('Review');
    //  tour.findOne({_id: req.params.id})
    if(!tour){
        return next(new AppError('No tour found with that ID', 404));
    }
    res.status(200)
        .json({
            status: 'success',
            // results: tours.length,
            data: {
                tour
            }
        });
});

exports.createTours = catchAsync(async (req, res, next) => {
        const newTour = await Tour.create(req.body);
            res.status(201)
            .json({
                status: 'success',
                data: {
                    tour: newTour,
                }
            });
    });

exports.deleteTours = factory.deleteOne(Tour);

exports.updateTours = factory.updateOne(Tour); 
