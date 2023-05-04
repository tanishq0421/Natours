const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './../../config.env'});

const Reviews = require('./../../models/reviewModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
}).then(con =>{
    // console.log(con.connection);
    console.log('DB connection successful!');
});

const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

// importing data 

const importData = async ()=>{
    try{
        await Reviews.create(reviews);
        console.log('Data Successfully loaded!');
        process.exit();
    }catch(err){
        console.log(err);
    }
};

// Delete All Data from DB

const deleteData = async ()=>{
    try{
        await Reviews.deleteMany();
        console.log('Data Successfully deleted!');
        process.exit();
    }catch(err){
        console.log(err);
    }
};

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}