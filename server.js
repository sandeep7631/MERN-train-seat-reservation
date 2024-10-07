const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://sandeep74:123456sa@cluster0.wcacgdn.mongodb.net/train_reservation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define Seat Schema
const seatSchema = new mongoose.Schema({
  seatNumber: Number,
  isBooked: Boolean,
  rowNumber: Number,
});

const Seat = mongoose.model('Seat', seatSchema);

// Initialize seats function
async function initializeSeats() {
  try {
    await Seat.deleteMany({});
    
    const seats = [];
    for (let i = 1; i <= 80; i++) {
      const rowNumber = Math.ceil(i / 7);
      seats.push({
        seatNumber: i,
        isBooked: false,
        rowNumber,
      });
    }
    await Seat.insertMany(seats);
    const count = await Seat.countDocuments();
    console.log(`Seats have been reinitialized. Total seats: ${count}`);
  } catch (error) {
    console.error('Error initializing seats:', error);
  }
}

// Call initializeSeats when the server starts
initializeSeats();

// API to get all seats
app.get('/api/seats', async (req, res) => {
  try {
    const seats = await Seat.find().sort('seatNumber');
    console.log('Seats fetched:', seats.length);
    res.json(seats);
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).json({ error: 'Error fetching seats' });
  }
});

// API to book seats
app.post('/api/book', async (req, res) => {
  const { numSeats } = req.body;

  if (numSeats < 1 || numSeats > 7) {
    return res.status(400).json({ error: 'Invalid number of seats' });
  }

  try {
    const availableSeats = await Seat.find({ isBooked: false }).sort('seatNumber');

    if (availableSeats.length < numSeats) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    let bookedSeats = [];
    let rowBooking = [];

    for (let i = 0; i < availableSeats.length; i++) {
      if (rowBooking.length === 0 || rowBooking[0].rowNumber === availableSeats[i].rowNumber) {
        rowBooking.push(availableSeats[i]);
      } else {
        if (rowBooking.length >= numSeats) {
          bookedSeats = rowBooking.slice(0, numSeats);
          break;
        }
        rowBooking = [availableSeats[i]];
      }

      if (rowBooking.length === numSeats) {
        bookedSeats = rowBooking;
        break;
      }
    }

    if (bookedSeats.length < numSeats) {
      bookedSeats = availableSeats.slice(0, numSeats);
    }

    for (const seat of bookedSeats) {
      seat.isBooked = true;
      await seat.save();
    }

    res.json(bookedSeats);
  } catch (error) {
    console.error('Error booking seats:', error);
    res.status(500).json({ error: 'Error booking seats' });
  }
});

// API endpoint to reset all bookings
app.post('/api/reset', async (req, res) => {
  try {
    await Seat.updateMany({}, { isBooked: false });
    console.log('All bookings have been reset');
    res.json({ message: 'All bookings have been reset' });
  } catch (error) {
    console.error('Error resetting bookings:', error);
    res.status(500).json({ error: 'Failed to reset bookings' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});