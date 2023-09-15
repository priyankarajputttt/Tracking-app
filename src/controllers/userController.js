const userService = require('../services/userService');

// Controller function for creating a new user
exports.signupUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.signupUser(userData);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function for user login


exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await userService.loginUser(email, password);
      res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: `Internal server error : ${error}` });
    }
  };

// Controller function for updating user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const email = req.params.email;
    // const newUserData = req.body;
    const updatedUser = await userService.updateUserProfile(email, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

// Controller function for marking off-hours for a user
exports.markOffHours = async (req, res) => {
  try {
    const email = req.params.email;
    const offHours = req.body;
    const updatedUser = await userService.markOffHours(email, offHours);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function for getting user's upcoming appointments
exports.getUpcomingAppointments = async (req, res) => {
  try {
    const email = req.params.email;
    const upcomingAppointments = await userService.getUpcomingAppointments(email);
    res.json(upcomingAppointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
