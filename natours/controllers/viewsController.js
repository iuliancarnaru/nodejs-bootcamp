const Tour = require('../models/tourModel');
const catchAsync = require('../utils/cachAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // get tour data from collection
  const tours = await Tour.find();

  // render template with data
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // get data for the requested tour
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'reviews rating user',
  });

  // render the template with data
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
    tour,
  });
});
