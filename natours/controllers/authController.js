const User = require('../models/userModel');
const catchAsync = require('../utils/cachAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});
