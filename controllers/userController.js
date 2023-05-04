const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async(req, res, next)=>{
    const user = await User.find();
    res.status(200).json({
        status: 'success',
        data:{
            user
        }
    });
}
);

exports.getUser = catchAsync(async(req, res, next)=>{
    const user = await User.findbyId(req.params.id)
    res.status(200).json({
        status: 'success',
        data:{
            user
        }
    });
});

exports.updateUser = catchAsync(async(req, res, next)=>{
    const user = await user.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
        status: "success",
        data:{
            user
        }
    });
});
    

exports.deleteUser = catchAsync(async(req, res, next)=>{
    await User.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: 'failed',
        message: "This route isn't setup yet!"
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }
});  