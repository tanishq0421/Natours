const express = require('express');
const tourController = require('./../controllers/tourController');
const reviewRouter = require('./../routes/reviewRoutes');
const router = express.Router();

// router.param('id', tourController.checkID); 
// router
//     .route('/top-5-cheap')
//     .get(tourController.aliasTopTours, tourController.getAllTours);


router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTours);
    

router
    .route('/:id')
    .get(tourController.getTours)
    .patch(tourController.updateTours)
    .delete(tourController.deleteTours)

router
    .use('/:tourId/reviews', reviewRouter)
module.exports = router;