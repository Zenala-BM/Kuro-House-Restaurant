import 'dotenv/config';
import express from 'express';
import { pool } from './db/pool.js';
import bcrypt from 'bcrypt';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import cors from 'cors';


const app = express();
const PgSession = connectPgSimple(session);

const sessionStore = new PgSession({
  pool,
  createTableIfMissing: true,
});

//cors config
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

//middleware
app.use(express.json()); //parse incoming JSON requests
const PORT = 3000;

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);


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


//registration route
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

//login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Email and password are required.',
      });
    }

    // Find the account by email
    const result = await pool.query(
      `SELECT id, name, email, password_hash
       FROM users
       WHERE email = $1`,
      [email.trim().toLowerCase()]
    );

    const user = result.rows[0];

    // Use the same response for unknown emails and incorrect passwords
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    // Compare the submitted password with the stored hash
    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    // Regenerate the session after successful login
    req.session.regenerate((error) => {
      if (error) {
        console.error('Session regeneration failed:', error.message);

        return res.status(500).json({
          message: 'Could not start a login session.',
        });
      }

      req.session.userId = user.id;

      req.session.save((error) => {
        if (error) {
          console.error('Session save failed:', error.message);

          return res.status(500).json({
            message: 'Could not save the login session.',
          });
        }

        return res.json({
          message: 'Login successful!',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      });
    });
  } catch (error) {
    console.error('Login failed:', error.message);

    return res.status(500).json({
      message: 'Something went wrong while logging in.',
    });
  }
});


//session checkpoint
app.get('/api/auth/me', async (req, res) => {
  try {
    // Check whether this request has an authenticated session
    if (!req.session.userId) {
      return res.status(401).json({
        message: 'You are not logged in.',
      });
    }

    // Find the logged-in user in the database
    const result = await pool.query(
      `SELECT id, name, email
       FROM users
       WHERE id = $1`,
      [req.session.userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: 'User account not found.',
      });
    }

    return res.json({ user });
  } catch (error) {
    console.error('Session check failed:', error.message);

    return res.status(500).json({
      message: 'Could not check the login session.',
    });
  }
});

//logout route

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error('Logout failed:', error.message);

      return res.status(500).json({
        message: 'Could not log out.',
      });
    }

    res.clearCookie('connect.sid', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.json({
      message: 'Logout successful!',
    });
  });
});

//reservation route

app.post('/api/reservations', async (req, res) => {
  try {
    // A reservation requires a logged-in user
    if (!req.session.userId) {
      return res.status(401).json({
        message: 'You must be logged in to make a reservation.',
      });
    }

    const {
      reservation_date,
      reservation_time,
      guest_count,
      special_requests,
    } = req.body;

    // Check the required fields
    if (!reservation_date || !reservation_time || guest_count === undefined) {
      return res.status(400).json({
        message: 'Date, time, and guest count are required.',
      });
    }

    // Validate the guest count
    const guests = Number(guest_count);

    if (!Number.isInteger(guests) || guests < 1 || guests > 12) {
      return res.status(400).json({
        message: 'Guest count must be between 1 and 12.',
      });
    }

    // Save the reservation for the logged-in user
    const result = await pool.query(
      `INSERT INTO reservations
        (user_id, reservation_date, reservation_time, guest_count, special_requests)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, reservation_date, reservation_time,
                 guest_count, special_requests, created_at`,
      [
        req.session.userId,
        reservation_date,
        reservation_time,
        guests,
        special_requests?.trim() || null,
      ]
    );

    return res.status(201).json({
      message: 'Reservation created successfully!',
      reservation: result.rows[0],
    });
  } catch (error) {
    console.error('Reservation creation failed:', error.message);

    return res.status(500).json({
      message: 'Something went wrong while creating the reservation.',
    });
  }
});

//retrieve reservations

app.get('/api/reservations', async (req, res) => {
  try {
    // Require a logged-in user
    if (!req.session.userId) {
      return res.status(401).json({
        message: 'You must be logged in to view reservations.',
      });
    }

    // Retrieve only this user's reservations
    const result = await pool.query(
      `SELECT id, reservation_date, reservation_time,
              guest_count, special_requests, created_at
       FROM reservations
       WHERE user_id = $1
       ORDER BY reservation_date ASC, reservation_time ASC`,
      [req.session.userId]
    );

    return res.json({
      reservations: result.rows,
    });
  } catch (error) {
    console.error('Fetching reservations failed:', error.message);

    return res.status(500).json({
      message: 'Could not retrieve reservations.',
    });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Kuro House API listening on http://localhost:${PORT}`);
});


