const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

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

// const Tour = mongoose.model('Tour', tourSchema);

// const testTour = new Tour({
//     name:'The Ice Lander',
//     price:999
// });

// testTour
//     .save()
//     .then(doc =>{
//         console.log(doc);
//     }).catch(err=>{
//         console.log('ERROR:', err);
//     })

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});