const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userSchemas = require("../schemas/userSchema");
const validateRequest = require("../validator/validator");

// User signup
router.post('/signup',   validateRequest(userSchemas.userRegister, "body"),
userController.signupUser);

// User login
router.post('/login', validateRequest(userSchemas.userRegister, "body"), userController.loginUser);

// Update user profile
router.put('/update-profile/:email', userController.updateUserProfile);

// Mark off-hours for a user
router.post('/:email/offhours', userController.markOffHours);

// Get user's upcoming appointments
router.get('/:email/appointments', userController.getUpcomingAppointments);

module.exports = router;
