const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { signup } = require('../controllers/authController');

// signup is only as post (create new user)
router.post('/signup', signup);

// managing users (admin)
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
