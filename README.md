# Train Seat Reservation System (MERN)

## Overview
This project is a **Train Seat Reservation System** built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It allows users to book seats in a train coach with specific conditions, ensuring that the seats are assigned in the most efficient way possible.

## Features
- **User-friendly Interface**: Built with React for a smooth and dynamic user experience.
- **Efficient Seat Assignment**: Seats are allocated according to specific conditions, ensuring optimal use of available space.
- **Real-time Seat Availability**: Users can view the real-time status of available seats.
- **Backend Powered by Node.js & Express**: Provides robust API endpoints for booking and managing seat reservations.
- **Database Management with MongoDB**: Stores seat reservation details and user data efficiently.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS (with responsive design)

## Installation and Setup
To get started with the project locally, follow these steps:

### Prerequisites
Ensure that you have the following installed on your system:
- **Node.js** (v14.x or above)
- **MongoDB** (Local or Cloud instance)

### Clone the Repository
```bash
git clone https://github.com/sandeep7631/train-seat-reservation-MERN.git
cd train-seat-reservation-MERN
```

### Install Dependencies
Navigate into the root folder and the client folder to install both backend and frontend dependencies:
```bash
# Install backend dependencies
npm install

# Navigate to the client folder and install frontend dependencies
cd client
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Run the Application
To start both the backend and frontend servers:
```bash
# In the root directory, start the backend server
npm start

# In the client directory, start the frontend server
npm start
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## Usage
- Open the frontend in your browser at `http://localhost:3000`.
- Select a seat or multiple seats to book.
- Confirm your booking and view the updated seat availability.

## Project Structure
```
train-seat-reservation-MERN/
├── client/                 # Frontend code (React)
├── models/                 # MongoDB models
├── routes/                 # Express routes for seat management
├── controllers/            # Business logic for seat booking
├── config/                 # Configuration files (e.g., database connection)
├── server.js               # Entry point for the backend
└── README.md               # Project documentation
```

## Future Enhancements
- **User Authentication**: Allow users to sign in and manage their bookings.
- **Payment Integration**: Implement payment gateways for online ticket booking.
- **Seat Preference Options**: Add functionality to select seat preferences (e.g., window, aisle).
  
## License
This project is licensed under the MIT License.

