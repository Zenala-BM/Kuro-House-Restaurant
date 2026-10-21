import express from 'express';
import { pool } from './db/pool.js';

const app = express();
const PORT = 3000;

// A simple endpoint to check whether the API is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Kuro House API is running!' });
});


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

// Start the server
app.listen(PORT, () => {
  console.log(`Kuro House API listening on http://localhost:${PORT}`);
});


