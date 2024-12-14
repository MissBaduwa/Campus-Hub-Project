import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const EventCalendar = ({ events, selectedType, selectedLocation }) => {
  const [calendarEvents, fetchCalendarEvents] = useState([]);


  useEffect(() => {
    if (events) {
      const mappedEvents = events.map((event) => {
        const eventDate = new Date(event.event_date); 
        return {
          title: event.name,
          start: eventDate, 
          end: eventDate,  
          location: event.location,
          description: event.description,
        };
      });
  
      console.log("Mapped Events:", mappedEvents);
      fetchCalendarEvents(mappedEvents);
    }
  }, [events, selectedType, selectedLocation]);
  

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Events Calendar</h2>

      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '500px' }}
        popup
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: '#ff6f91',
            color: 'white',
            borderRadius: '5px',
            padding: '5px',
          },
        })}
        onSelectEvent={(event) =>
          alert(`Event Details:\n\nName: ${event.title}\nLocation: ${event.location}`)
        }
      />
    </div>
  );
};


export default EventCalendar;
