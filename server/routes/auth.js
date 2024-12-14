import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// User Registration 
router.post('/register', async (req, res) => {
  const { name, email, password, role, preferences } = req.body; // Include preferences

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = role || 'Faculty';

    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, role, preferences) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, userRole, preferences] // Add preferences to the query
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({
      message: 'Error registering user',
    });
  }
});



// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
