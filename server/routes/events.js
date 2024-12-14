import express from 'express';
import db from '../db.js';
import jwt from 'jsonwebtoken';


const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await db.query('SELECT * FROM events ORDER BY event_date');
    res.json(events.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err.message });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }
    req.user = { id: user.id, role: user.role }; 
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  console.log('User ID:', req.userId, 'Role:', req.role);
  
  if (req.userId === 10) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
  
};


// Create new event
router.post('/events',authenticateToken, verifyAdmin, async (req, res) => {
  const { name, event_date, location, capacity, available_seats, description, type_id } = req.body;
  
  try {
    const result = await db.query(
      'INSERT INTO events (name, event_date, location, capacity, available_seats, description, type_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, event_date, location, capacity, available_seats, description, type_id]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});


// Delete event (only for Admin User)
router.delete('/:event_id', authenticateToken, verifyAdmin, async (req, res) => {
  const { event_id } = req.params;

  try {
    await db.query('DELETE FROM events WHERE event_id = $1', [event_id]);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get calendar events
router.get('/calendar', async (req, res) => {
  const { type, location } = req.query;

  let query = `
    SELECT 
      e.event_id,
      e.name AS event_name,
      e.event_date,
      e.location,
      e.available_seats,
      e.capacity,
      t.name AS event_type
    FROM events e
    LEFT JOIN event_types t ON e.type_id = t.type_id
    WHERE 1=1
  `;

  const params = [];
  if (type) {
    params.push(type);
    query += ` AND t.name = $${params.length}`;
  }
  if (location) {
    params.push(`%${location}%`);
    query += ` AND e.location ILIKE $${params.length}`;
  }

  query += ' ORDER BY e.event_date';

  try {
    const events = await db.query(query, params);
    res.json(events.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching calendar events', error: err.message });
  }
});


// RSVP to an event
router.post('/rsvp', async (req, res) => {
  const { id, event_id } = req.body;

  try {
    const event = await db.query('SELECT available_seats FROM events WHERE event_id = $1', [event_id]);
    if (event.rows.length === 0) return res.status(404).json({ message: 'Event not found' });
    if (event.rows[0].available_seats <= 0) return res.status(400).json({ message: 'No available seats' });

    const existingRSVP = await db.query('SELECT * FROM rsvps WHERE id = $1 AND event_id = $2', [id, event_id]);
    if (existingRSVP.rows.length > 0) return res.status(400).json({ message: 'You have already RSVP\'d to this event' });

    await db.query('INSERT INTO rsvps (id, event_id) VALUES ($1, $2)', [id, event_id]); 
    await db.query('UPDATE events SET available_seats = available_seats - 1 WHERE event_id = $1', [event_id]);

    res.status(200).json({ message: 'RSVP successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error processing RSVP', error: err.message });
  }
});


// Get RSVP'd events for a user
router.get('/rsvp/:id', async (req, res) => {
  console.log(`Fetching RSVP data for user ID: ${req.params.id}`);
  const { id } = req.params;

  try {
    const rsvp = await db.query(
      `
      SELECT e.name, e.event_date, e.location 
      FROM rsvps r
      JOIN events e ON r.event_id = e.event_id
      WHERE r.id = $1
      ORDER BY e.event_date
      `,
      [id]
    );

    res.json(rsvp.rows);
  } catch (err) {
    console.error('Error fetching RSVP data:', err);
    res.status(500).json({ message: 'Error fetching RSVP\'d events', error: err.message });
  }
});


// Fetch all event types with only the required fields
router.get('/event-types', async (req, res) => {
  try {
    const result = await db.query('SELECT type_id, name FROM event_types');
    res.status(200).json(result.rows); 
  } catch (error) {
    console.error('Error fetching event types:', error.message);
    res.status(500).json({ message: 'Error fetching event types', error: error.message });
  }
});


export default router;
