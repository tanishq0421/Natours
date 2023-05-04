const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        min:1,
        max:5,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        required:true,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: true,
    }
})

reviewSchema.pre(/^find/, function(next){
    this.populate({
        path:'user',
        select: 'photo'
    })
    next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;