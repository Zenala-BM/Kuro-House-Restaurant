import express from 'express';
import { pool } from './db/pool.js';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json()); //parse incoming JSON requests
const PORT = 3000;

app.get('/api/db-health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      status: 'OK',
      message: 'Connected to the Kuro House database!',
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);

    res.status(500).json({
      status: 'ERROR',
      message: 'Could not connect to the database.',
    });
  }
});


app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check that all required fields were provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required.',
      });
    }

    // Validate the email format
    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        message: 'Please provide a valid email address.',
      });
    }

    // Validate the password
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long.',
      });
    }

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        message: 'Please provide a valid name.',
      });
    }

    if (name.trim().length > 100 || normalizedEmail.length > 255) {
      return res.status(400).json({
        message: 'Name or email is too long.',
      });
    }

    // Hash the password before storing it
    const passwordHash = await bcrypt.hash(password, 12);

    // Save the user in PostgreSQL
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name.trim(), normalizedEmail, passwordHash]
    );

    // Return the new account without its password hash
    return res.status(201).json({
      message: 'Account created successfully!',
      user: result.rows[0],
    });
  } catch (error) {
    // PostgreSQL error code 23505 means a unique constraint was violated
    if (error.code === '23505') {
      return res.status(409).json({
        message: 'An account with this email already exists.',
      });
    }

    console.error('Registration failed:', error.message);

    return res.status(500).json({
      message: 'Something went wrong while creating your account.',
    });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Kuro House API listening on http://localhost:${PORT}`);
});


