# Appointment Scheduling Application

**Project Overview:**  
The Appointment Scheduling Application is designed to streamline the process of scheduling appointments with others while tracking their availability. This application helps users easily manage their appointments, view upcoming schedules, and mark off-hours when they are unavailable.

## Key Features

- User Registration and Login:
  - Users can sign up and log in to the application.

- Appointment Scheduling:
  - Users can schedule appointments with other users on the platform.
  - Appointments include title, agenda, time, and the guest (the person with whom the appointment is scheduled).
  - Appointments can only be scheduled if the guest user is available during the specified time.

- Upcoming Appointments:
  - Users can view their upcoming appointments conveniently.

- User Profile Management:
  - Users can update their profile name and password.
  - Users can mark their off-hours when they are not available for appointments during the day.

## Requirements

Before you begin, ensure you have the following prerequisites:

- Node.js and npm installed.
- MongoDB or MySQL database set up and running.
- Postman or a similar API testing tool for interaction.

## Project Structure

The project follows an MVC (Model-View-Controller) structure:

- **Controller:** Handles request and response logic.
- **Routes:** Define API endpoints.
- **Services:** Contains business logic and interacts with the database.
- **Models:** Define data structures and schemas.
- **Middleware:** Provides authentication and validation.
- **Schemas:** Include validation schemas for data.

## Getting Started

To set up and run the Appointment Scheduling Application on your local machine, follow these steps:

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

   2. **Install Dependencies**

   Navigate to the project directory:

   ```bash
   cd app-tracking
   ```

   Next, install the project dependencies using npm (Node Package Manager). Run the following command:

   ```bash
   npm install
   ```

   This will download and install all the required packages and modules specified in the `package.json` file.

3. **Configure MongoDB**

   The project relies on MongoDB as its database. You'll need to set up a MongoDB database and configure the connection URL in the project.

   - If you don't have MongoDB installed locally, you can install it by following the instructions on the [MongoDB website](https://docs.mongodb.com/manual/installation/).

   - Once MongoDB is installed, you can create a new database and obtain the connection URL.

   - Update the MongoDB connection URL in the `server.js` file in your project directory. Look for the following line and replace it with your database URL:

     ```javascript
     mongoose.connect('mongodb+srv://pr639490:bnIh7jpCvHeyOAX3@cluster0.mzvhqlq.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

4. **Start the Server**

   After configuring the database, you can start the server by running the following command:

   ```bash
   npm start
   ```

   This command will start the Node.js server, and you should see a message indicating that the server is running on a specific port (e.g., `Server is running on port 3000`).

5. **Testing the API**

Test the API endpoints using Postman or similar tools:

User Registration:

Use a POST request to /signup to register a new user.
User Login:

Use a POST request to /login to log in as an existing user.
Scheduling Appointments:

Use a POST request to /appointments to schedule an appointment with another user.
Viewing Upcoming Appointments:

Use a GET request to /users/:username/appointments to retrieve upcoming appointments.