import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [seats, setSeats] = useState([]);
  const [numSeats, setNumSeats] = useState(1);
  const [message, setMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/seats');
      console.log('Seats received:', response.data.length);
      setSeats(response.data);
    } catch (error) {
      console.error('Error fetching seats:', error);
      setMessage('Failed to fetch seats');
    }
  };

  const bookSeats = async () => {
    if (numSeats < 1 || numSeats > 7) {
      setValidationMessage('Select seats between 1 to 7');
      return;
    }
    setValidationMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/book', { numSeats });
      setMessage(`Booked seats: ${response.data.map(seat => seat.seatNumber).join(', ')}`);
      fetchSeats();
    } catch (error) {
      console.error('Error booking seats:', error);
      setMessage(error.response?.data?.error || 'Failed to book seats');
    }
  };

  const resetBookings = async () => {
    try {
      await axios.post('http://localhost:5000/api/reset');
      setMessage('All bookings have been reset');
      fetchSeats();
    } catch (error) {
      console.error('Error resetting bookings:', error);
      setMessage('Failed to reset bookings');
    }
  };

  return (
    <div className="App">
      <h1>Train Seat Reservation</h1>
      <div>
        <input
          type="number"
          min="1"
          max="7"
          value={numSeats}
          onChange={(e) => {
            setNumSeats(parseInt(e.target.value));
            setValidationMessage(e.target.value < 1 || e.target.value > 7 ? 'Select seats between 1 to 7' : '');
          }}
        />
        <button className="book-button" onClick={bookSeats}>Book Seats</button>
        <button className="reset-button" onClick={resetBookings}>Reset All Bookings</button>
      </div>
      {validationMessage && <p className="validation-message">{validationMessage}</p>}
      <p>{message}</p>
      <div className="seat-layout">
        {seats.length > 0 ? (
          seats.map((seat) => (
            <div
              key={seat.seatNumber}
              className={`seat ${seat.isBooked ? 'booked' : 'available'}`}
            >
              {seat.seatNumber}
            </div>
          ))
        ) : (
          <p>No seats available</p>
        )}
      </div>
    </div>
  );
}

export default App;
