import React, { useEffect, useState } from 'react';
import { fetchEvents,fetchEventCalendar, fetchEventTypes } from '../../utils/api';
import EventCard from '../../components/eventcard/EventCard';
import EventCalendar from '../eventcalendar/EventCalendar';


const Home = () => {
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');


  useEffect(() => {
    const loadEvents = async () => {
      try {
        const { data } = await fetchEvents();
        console.log(data); 
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

  const handleLocationFilterChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const filteredEvents = selectedType
    ? events.filter((event) => event.type_id === parseInt(selectedType))
    : events;


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">WHATS HAPPENNING ON CAMPUS?</h1>

      <div className="mb-4">
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

      <section className="mb-8">
        <EventCalendar
          selectedType={selectedType}
          selectedLocation={selectedLocation}
          events={filteredEvents}  
        />
      </section>

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


export default Home;

