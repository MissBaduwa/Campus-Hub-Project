import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000' });


export const registerUser = (userData) => API.post('/auth/register', userData);

export const fetchEvents = () => API.get('/events');

export const rsvpEvent = (data) => API.post('/events/rsvp', data);

export const fetchUserRSVPs = (id) => API.get(`/events/rsvp/${id}`);

export const fetchEventTypes = () => API.get('/events/event-types');

export const loginUser = async (userData) => {
  const response = await API.post('/auth/login', userData);
  
  const { token, role, id } = response.data;

  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
  localStorage.setItem('userId', id);

  return response.data;
};


// Fetch user profile by user ID
export const fetchUserProfile = (id) => {
    const token = localStorage.getItem('token');
    return API.get(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };
  

// Update user preferences
export const updateUserPreferences = (id, preferences) => {
  const token = localStorage.getItem('token');
  return API.put(`/users/${id}/preferences`, { preferences }, {
    headers: { Authorization: `Bearer ${token}` }  
  });
};


export const createEvent = async (eventData) => {
  try {
    const response = await axios.post('http://localhost:5000/events/events', eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};


export const fetchEventCalendar = (type, location) => {
  const params = {};
  if (type) params.type = type;
  if (location) params.location = location;
  return API.get('/events/calendar', { params });
};


export const deleteEvent = async (event_id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/events/${event_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};



