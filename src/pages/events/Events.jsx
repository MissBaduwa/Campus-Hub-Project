import React, { useEffect, useState } from 'react';
import { fetchEvents, fetchEventTypes } from '../../utils/api';
import { useNavigate } from 'react-router-dom'; 
import EventCard from '../../components/eventcard/EventCard';


const Events = () => {
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [userId, setUserId] = useState(null); 
  const [userRole, setUserRole] = useState(null); 
  const navigate = useNavigate(); 


  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem('id'),10);
    const storedUserRole = localStorage.getItem('role'); 
    console.log('Stored User ID:', storedUserId);
    setUserId(storedUserId);
    setUserRole(storedUserRole);

    const loadEvents = async () => {
      try {
        const { data } = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };


    const loadEventTypes = async () => {
      try {
        const { data } = await fetchEventTypes();
        setEventTypes(data);
      } catch (error) {
        console.error('Error loading event types:', error);
      }
    };

    loadEvents();
    loadEventTypes();
  }, []);


  const handleTypeFilterChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredEvents = selectedType
    ? events.filter((event) => event.type_id === parseInt(selectedType))
    : events;


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      
      {userId === 10 && (
  <button
  onClick={() => navigate('/update-events')}
  className="mb-9 px-5 py-3 bg-gray-700 text-white rounded-md hover:bg-blue-800 flex ml-auto"
>
  Update Events
</button>

)}


      <div className="mb-4">
        <label htmlFor="event-type" className="text-xl text-gray-400 font-semibold">
          Filter by Preference
        </label>
        <select
          id="event-type"
          className="ml-2 p-2 border rounded-lg"
          value={selectedType}
          onChange={handleTypeFilterChange}
        >
          <option value="">All Event Types</option>
          {Array.isArray(eventTypes) && eventTypes.map((type) => (
            <option key={type.type_id} value={type.type_id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.event_id}
              event={event}
              onRSVP={() => alert(`RSVP for ${event.name}`)}
            />
          ))
        ) : (
          <p>No events available at the moment.</p>
        )}
      </div>
    </div>
  );
};


export default Events;
