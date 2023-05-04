const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// MIDDLEWARES
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);


app.all('*', (req,res,next)=>{
    // res.status(404).json({
    //     status:'fail',
    //     message: `Can't find ${req.originalUrl} on this server!`
    // });
    // const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    // err.status = 'fail';
    // err.statusCode = 404;
    
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

// 1) API Basics 
// app.get('/', (req,res) => {
//     res
//         .status(200)
//         .json({message:'Hello from the server side!', app: 'Natours'});
    
// })

// app.post('/', (req,res) => {
//     res
//         .status(200)
//         .json({message:'Hello from the server side!', app: 'Natours'});
    
// })

// 2) File Reading 

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

// 3)Route Handler

// const getAllUsers = ((req, res)=>{
//     res.status(500).json({
//         status: 'failed',
//         message:"This route isn't setup yet"
//     });
// });

// const getUser = ((req, res)=>{
//     res.status(500).json({
//         status: 'failed',
//         message: "This route isn't setup yet!"
//     });
// });

// const updateUser = ((req, res)=>{
//     res.status(500).json({
//         status: 'failed',
//         message: "This route isn't setup yet!"
//     });
// });

// const createUser = ((req, res)=>{
//     res.status(500).json({
//         status: 'failed',
//         message: "This route isn't setup yet!"
//     });
// });

// const deleteUser = ((req, res)=>{
//     res.status(500).json({
//         status: 'failed',
//         message: "This route isn't setup yet!"
//     });
// });

// const getAllTours = (req, res)=>{
//     console.log(req.requestTime);
//     res.status(200).json({
//         status: 'success',
//         data:{
//             id: tours.length,
//             requestedAt: req.requestTime,
//             tours
//         }
//     });
// };

// const getTours = (req, res)=>{
//     console.log(req.params);
//     const id = req.params.id*1;

//     if(id> tours.length){
//         return res
//                     .status(404)
//                     .json({
//                         status: 'fail',
//                         message: 'invalid ID',
                        
//                     })
//     }

//     const tours = tours.find(el => el.id === id);
//     res.status(200)
//         .json({
//             status: 'success',
//             // results: tours.length,
//             data:{
//                 tour
//             }
//         });
// }

// const createTours = (req, res)=>{
//     // console.log(req.body);

//     const newId = tours[tours.length-1].id+1;
//     const newTour= Object.assign({id: newId}, req.body);

//     tours.push(newTour);
//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
//         console.log(newTour);
//         res.status(201)
//             .json({
//                 status: 'success',
//                 data: {
//                     tour: newTour
//                 }
//             });
//     }

//     );
// }

// const deleteTours = (req, res)=>{
//     if(req.params.id> tours.length){
//         return res
//                     .status(404)
//                     .json({
//                         status: 'fail',
//                         message: 'invalid ID',
                        
//                     })
//     }
//     res
//         .status(204)
//         .json({
//             status: 'success',
//             data:null,
//         });
// }

// const updateTours = (req, res)=>{
//     if(req.params.id > tours.length){
//         return res
//                     .status(404)
//                     .json({
//                         status: 'fail',
//                         message: 'invalid ID',
                        
//                     })
//     }
//     res
//         .status(201)
//         .json({
//             status: 'success',
//             data:null,
//         });
// }

// app.get('/api/v1/tours/:id?', getAllTours);
// app.get('/api/v1/tours/:id?', getTour);
// app.post('/api/v1/tours', createTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.get('/api/v1/tours/:id?', updateTour);

// const tourRouter = express.Router();
// const userRouter = express.Router();

// tourRouter
//     .route('/')
//     .get(getAllTours)
//     .post(createTours)
    

// tourRouter
//     .route('/:id')
//     .get(getTours)
//     .patch(deleteTours)
//     .delete(updateTours)

// userRouter
//     .route('/')
//     .get(getAllUsers)
//     .post(createUser)

// userRouter
//     .route('/:id')
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser)

// 4) Routes


// 5) Server Start


