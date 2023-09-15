const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "secret-key";


// Service function for creating a new user
exports.signupUser = async (userData) => {
  try {
    const { username, password , email } = userData;

    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword , email});
    await newUser.save();

    return newUser;
  } catch (error) {
    throw new Error('Could not create user');
  }
};

// Service function for user login and JWT token generation

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new Error("User not found.");
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
      throw new Error("Incorrect password.");
    }
  
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
    return token;
  };

// Update user profile
exports.updateUserProfile = async (email, newUserData) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: newUserData },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  } catch (error) {
    throw new Error(`Could not update user profile - ${error}`);
  }
};

// Mark off-hours for a user
exports.markOffHours = async (email, offHours) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $push: { offHours } },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  } catch (error) {
    throw new Error('Could not mark off-hours');
  }
};

// Get user's upcoming appointments
exports.getUpcomingAppointments = async (email) => {
  try {
    const user = await User.findOne({ email }).populate('appointments');
    console.log(user)
    if (!user) {
      throw new Error('User not found');
    }
    return user.appointments;
  } catch (error) {
    throw new Error('Could not retrieve upcoming appointments');
  }
};
