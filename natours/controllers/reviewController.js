const Review = require('../models/reviewModel');
const catchAsync = require('../utils/cachAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);

  req.status(201).json({
    status: 'success',
    data: {
      review,
    },
  });
});
