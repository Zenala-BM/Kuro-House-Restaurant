# Kuro House — Japanese Restaurant Website

Kuro House is a modern Japanese restaurant website inspired by the Japanese izakaya dining experience. The project combines a responsive restaurant website with a backend API, PostgreSQL database, user authentication, and table reservation management.

**Live Website:** https://kuro-house-restaurant.pages.dev/

**Backend API:** https://kuro-house-restaurant.onrender.com

## Features

### Restaurant Website
- Responsive, mobile-first layout.
- Navigation, hero section, menu, restaurant story, reservations, and footer.
- Menu items organised by category: Starters, Mains, and Desserts.
- Interactive menu category filtering.
- Reusable React components.
- Responsive styling with Tailwind CSS.

### User Authentication
- User registration and login.
- Password hashing using bcrypt.
- Session-based authentication.
- Persistent login sessions across page refreshes.
- Logout functionality.
- Session storage backed by PostgreSQL.

### Reservation Management
- Authenticated users can create reservations.
- Reservations include the date, time, guest count, and optional special requests.
- Reservations are stored in PostgreSQL.
- Users can retrieve and view their own reservations.
- Guest counts are validated between 1 and 12.
- Reservation access is restricted to authenticated users.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite |
| Styling | Tailwind CSS v4 |
| Backend | Node.js, Express |
| Database | PostgreSQL, Neon |
| Authentication | bcrypt, express-session |
| Session storage | connect-pg-simple |
| API communication | Fetch API |
| Frontend hosting | Cloudflare Pages |
| Backend hosting | Render |
| Version control | Git, GitHub |

## Project Structure

```text
Kuro-House-Restaurant/
├── functions/
│   └── api/
│       └── [[path]].js
├── public/
│   └── images/
├── src/
│   ├── api/
│   │   └── client.js
│   ├── components/
│   │   ├── Auth.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Menu.jsx
│   │   ├── MenuItem.jsx
│   │   ├── OurStory.jsx
│   │   ├── Reservations.jsx
│   │   ├── GuestStepper.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── menuData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── db/
│   │   └── pool.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*Note: The structure above highlights the main project files. Your repository may contain additional files.*

## Getting Started

### Prerequisites

Install the following before running the project locally:

- Node.js and npm.
- Git.
- A PostgreSQL database, such as Neon, configured with the required tables.

### 1. Clone the repository

```bash
git clone https://github.com/Zenala-BM/Kuro-House-Restaurant.git
cd Kuro-House-Restaurant
```

### 2. Install frontend dependencies

From the project root:

```bash
npm install
```

### 3. Configure the backend

Navigate into the server directory and install its dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory with the following variables:

```env
PORT=3000
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_long_random_secret
NODE_ENV=development
```

Replace the example values with your own credentials. Never commit your actual `.env` file or expose database credentials and session secrets.

Ensure that your PostgreSQL database contains the required `users` and `reservations` tables.

### 4. Start the backend

From the `server` directory:

```bash
npm run dev
```

The API should be available at:

`http://localhost:3000`

### 5. Start the frontend

Open a second terminal at the project root:

```bash
npm run dev
```

Vite will provide a local development URL, usually:

`http://localhost:5173`

Open the URL displayed in your terminal to use the website locally.

## API Endpoints

The backend exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/db-health` | Checks database connectivity |
| POST | `/api/auth/register` | Registers a new user |
| POST | `/api/auth/login` | Authenticates a user |
| GET | `/api/auth/me` | Retrieves the current session user |
| POST | `/api/auth/logout` | Ends the current session |
| POST | `/api/reservations` | Creates a reservation |
| GET | `/api/reservations` | Retrieves the authenticated user's reservations |

Protected reservation endpoints require a valid authenticated session. Reservation queries are restricted to the current user's account.

## Database Design

The application uses PostgreSQL with two main tables.

### Users

Stores account information, including:

- `id` — primary key.
- `name` — user's name.
- `email` — unique email address.
- `password_hash` — hashed password.
- `created_at` — account creation timestamp.

### Reservations

Stores restaurant reservation information, including:

- `id` — primary key.
- `user_id` — foreign key referencing the user.
- `reservation_date` — reservation date.
- `reservation_time` — reservation time.
- `guest_count` — number of guests, between 1 and 12.
- `special_requests` — optional customer requests.
- `created_at` — reservation creation timestamp.

The relationship between the tables allows each user to have multiple reservations. The foreign key also ensures that reservations are associated with valid user accounts.

## Deployment

The application is deployed using separate frontend and backend hosting services.

- **Cloudflare Pages:** Hosts the React frontend and handles `/api/*` requests through a Pages Function proxy.
- **Render:** Hosts the Express API.
- **Neon:** Provides the hosted PostgreSQL database.

In production, the frontend sends API requests through the same-origin `/api` path, which the Cloudflare Pages Function forwards to the backend. The backend uses secure session cookies and PostgreSQL-backed session storage to maintain authentication.

## Security

- Passwords are hashed with bcrypt rather than stored as plain text.
- Database credentials and session secrets are stored in environment variables.
- `.env` files are excluded from version control.
- Session cookies are configured as HTTP-only and secure in production.
- Authenticated endpoints verify the user's session.
- Reservations are associated with the authenticated user's ID.

## Learning Objectives

This project demonstrates practical experience with:

- Building reusable React components.
- Managing UI state and controlled form inputs.
- Creating a REST-style API with Express.
- Connecting a backend to a PostgreSQL database.
- Implementing password hashing and session-based authentication.
- Handling protected routes and user-specific data.
- Configuring environment variables.
- Deploying a full-stack application.
- Using Git and GitHub for version control.

## Author

Developed as an individual web development project.
