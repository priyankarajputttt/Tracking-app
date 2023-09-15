const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userSchemas = require("../schemas/userSchema");
const validateRequest = require("../validator/validator");
const authenticationMiddleware = require("../middleware/authentication");

// User signup
router.post('/signup',   validateRequest(userSchemas.userSignup, "body"),
userController.signupUser);

// User login
router.post('/login', validateRequest(userSchemas.userLogin, "body"), userController.loginUser);

// Update user profile
router.put('/update-profile/:email',authenticationMiddleware,userController.updateUserProfile);

// Mark off-hours for a user
router.post('/:email/offhours',authenticationMiddleware, userController.markOffHours);

// Get user's upcoming appointments
router.get('/:email/appointments',authenticationMiddleware , userController.getUpcomingAppointments);

module.exports = router;
