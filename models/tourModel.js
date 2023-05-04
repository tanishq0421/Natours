const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'A tour must have a price'],
        unique:true,
        trim: true
    },
    duration:{
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    rating: {
        type : Number,
        default : 4.5
    },
    price: {
        type:Number,
        required: [true, 'A tour must have a price']
    },
    maxGroupSize:{
        type: Number,
        required: [true, 'A tour must have a groupsize']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage:{
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    priceDiscount:{
        type: Number,
    },
    summary: {
            type: String,
            trim: true,
            required: [true, 'A tour must have a summary']
    },
    description:{
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true,'A tour must have a imageCover']
    },
    images: [String],
    createdAt:{
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    startLocation:{
        // geoJSON
        type:{
            type : String,
            default: 'Point',
            enum:['Point']
        },
        coordinates: [Number],
        address:String,
        description: String
    },
    locations:[
        {
            type:{
                type: String,
                default: 'Point',
                enum:['Point']
            }, 
            coordinates: [Number],
            address: String,
            day: Number,
        }   
    ],
    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    
});

// tourSchema.pre('save', async function(next){
//     const guidePromises = this.guides.map(async id => await User.findById(id));
//     this.guides = await Promise.all(guidePromises);
//     next();
// });

tourSchema.pre(/^find/, function(next){
    this.populate ({
        path: 'guides',
        select: '-__v -passwordchangedAt'
    });
    next();
});

// virtual populate
tourSchema.virtual('Review', {
    ref : 'Review',
    foreignField: 'tour',
    localField: '_id'
})

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;