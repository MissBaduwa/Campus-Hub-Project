import express from 'express';
import db from '../db.js';
import jwt from 'jsonwebtoken';


const router = express.Router();

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


// Get user profile
router.get('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  if (parseInt(id) !== req.userId) return res.status(403).json({ message: 'Access denied' });

  try {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (user.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
});


// Update user preferences
router.put('/:id/preferences', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { preferences } = req.body;

  if (parseInt(id) !== req.userId) return res.status(403).json({ message: 'Access denied' });

  try {
    await db.query('UPDATE users SET preferences = $1 WHERE id = $2', [preferences, id]);
    res.status(200).json({ message: 'Preferences updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating preferences', error: err.message });
  }
});


export default router;
