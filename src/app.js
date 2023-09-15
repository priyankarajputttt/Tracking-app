const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require("./routes/userRouter");
const appointmentRoutes = require("./routes/appointmentRouter");


// Middleware for parsing JSON requests
app.use(express.json());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://pr639490:bnIh7jpCvHeyOAX3@cluster0.mzvhqlq.mongodb.net/'; 
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
