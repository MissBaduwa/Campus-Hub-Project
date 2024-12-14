import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEventTypes, createEvent, fetchEvents, deleteEvent } from '../../utils/api';


const UpdateEvents = () => {
  const [eventTypes, setEventTypes] = useState([]);
  const [events, setEvents] = useState([]); 
  const [newEvent, setNewEvent] = useState({
    name: '',
    event_date: '',
    location: '',
    capacity: '',
    available_seats: '',
    description: '',
    type_id: '',
  });
  const navigate = useNavigate();


  useEffect(() => {
    const loadEventTypes = async () => {
      try {
        const { data } = await fetchEventTypes();
        setEventTypes(data);
      } catch (error) {
        console.error('Error loading event types:', error);
      }
    };

const loadEvents = async () => {
      try {
        const { data } = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };

    loadEventTypes();
    loadEvents();
  }, []);

const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(newEvent);
      alert('Event added successfully!');
      navigate('/events');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event, please try again!');
    }
  };

const handleDelete = async (event_id) => {
    try {
      await deleteEvent(event_id);
      setEvents(events.filter((event) => event.event_id !== event_id));
      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event, please try again!');
    }
  };


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Events</h1>

      <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <input
          type="text"
          name="name"
          value={newEvent.name}
          onChange={handleChange}
          placeholder="Event Name"
          className="p-3 border rounded-lg w-3/4 mx-auto mb-2"
        />
        <input
          type="date"
          name="event_date"
          value={newEvent.event_date}
          onChange={handleChange}
          className="p-3 border rounded-lg w-3/4 mx-auto mb-2"
        />
        <input
          type="text"
          name="location"
          value={newEvent.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-3 border rounded-lg w-3/4 mx-auto mb-2"
        />
        <input
          type="number"
          name="capacity"
          value={newEvent.capacity}
          onChange={handleChange}
          placeholder="Capacity"
          className="p-3 border rounded-lg w-3/4 mx-auto mb-2"
        />
        <input
          type="number"
          name="available_seats"
          value={newEvent.available_seats}
          onChange={handleChange}
          placeholder="Available Seats"
          className="p-3 border rounded-lg w-3/4 mx-auto mb-2"
        />
        <textarea
          name="description"
          value={newEvent.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-3 border rounded-lg w-3/4 mx-auto mb-2"
        ></textarea>
        <select
          name="type_id"
          value={newEvent.type_id}
          onChange={handleChange}
          className="p-3 border rounded-lg w-3/4 mx-auto mb-2"
        >
          <option value="">Select Event Type</option>
          {eventTypes.map((type) => (
            <option key={type.type_id} value={type.type_id}>
              {type.name}
            </option>
          ))}
        </select>
        <div className="w-full flex justify-end">
    <button
      type="submit"
      className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
    >
      Add Event
    </button>
    </div>
  </div>
      </form>

      <h1 className="text-2xl font-semibold mb-6">Existing Events</h1>
      <div>
        {events.map((event) => (
          <div key={event.event_id} className="mb-5 p-4 border rounded-lg">
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p  className="text-gray-600">Date: {event.event_date}</p>
            <p  className="text-gray-600">Location: {event.location}</p>
            <p  className="text-gray-600">Description: {event.description}</p>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-lg mt-3 shadow-md hover:bg-pink-500"
              onClick={() => handleDelete(event.event_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


export default UpdateEvents;
