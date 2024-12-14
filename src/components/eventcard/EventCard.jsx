import React from 'react';
import { rsvpEvent } from '../../utils/api'; 


const EventCard = ({ event, onRSVP }) => {
  const { name, event_date, location, available_seats, capacity, description, event_id } = event;


  const handleRSVP = async () => {
    const id = localStorage.getItem('id'); 
    if (!id) {
      alert('Please log in to RSVP.');
      return;
    }

    try {
      await rsvpEvent({ id, event_id });
      onRSVP(); 
      alert('RSVP successful!');
    } catch (error) {
      console.error('Error during RSVP:', error);
      alert('Something went wrong. Please try again.');
    }
  };


  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">Date: {new Date(event_date).toLocaleDateString()}</p>
      <p className="text-gray-600">Location: {location}</p>
      <p className="text-gray-600">Seats: {available_seats}/{capacity}</p>
      <p className="text-gray-600">{description}</p>
      <button
        className="bg-pink-500 text-white px-4 py-2 rounded-lg mt-2"
        onClick={handleRSVP}
        disabled={available_seats <= 0}
      >
        RSVP
      </button>
    </div>
  );
};


export default EventCard;
