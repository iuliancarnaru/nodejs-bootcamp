const express = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getMyTours,
} = require('../controllers/viewsController');

// const { createBookingCheckout } = require('../controllers/bookingController');

const { protect, isLoggedIn } = require('../controllers/authController');

const router = express.Router();

router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);
router.get('/my-tours', /* createBookingCheckout */ protect, getMyTours);
router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
