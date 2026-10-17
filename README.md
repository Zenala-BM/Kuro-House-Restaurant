# Kuro House — Japanese-Inspired Restaurant Website

Kuro House is a responsive restaurant website built as part of a web development learning assignment. The project focuses on component-based development with React, interactive UI elements, responsive layouts, and utility-first styling with Tailwind CSS.

## Overview

The website presents Kuro House as a Japanese-inspired restaurant, featuring its menu, restaurant story, reservation form, and contact information in a clean, understated design.

## Features

- **Responsive navigation:** Navigation links and a mobile menu for smaller screens.
- **Hero section:** Restaurant introduction with a prominent reservation call to action.
- **Interactive menu:** Nine menu items organised into categories, with filters for All, Starters, Main, and Desserts.
- **Restaurant story:** An introduction to the restaurant and its philosophy.
- **Reservation form:** Collects guest details, date, time, and special requests.
- **Guest selector:** An interactive stepper for selecting between 1 and 10 guests.
- **Form feedback:** Displays a demonstration message when the reservation form is submitted.
- **Responsive footer:** Includes restaurant information, opening hours, and location details.

> **Note:** This is a front-end demonstration project. Reservations are not stored or sent to a restaurant, and no backend or database is connected.

## Technologies Used

- React
- JavaScript (JSX)
- Vite
- Tailwind CSS v4
- HTML5
- Git and GitHub

## Project Structure

```text
Kuro-House-Restaurant/
├── public/
│   └── images/
├── src/
│   ├── components/
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
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*The structure above reflects the intended organisation of the project. Adjust the filenames if your final repository differs.*

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm.

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Navigate into the project directory:

   ```bash
   cd Kuro-House-Restaurant
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal, usually `http://localhost:5173`.

## Learning Objectives

This project provides practical experience with:

- Breaking a website into reusable React components.
- Separating menu data from presentation logic.
- Rendering lists using JavaScript's `map()` method.
- Filtering data using `filter()`.
- Managing interactive UI state with React's `useState` hook.
- Passing values and callback functions through props.
- Building controlled components.
- Creating responsive, mobile-first layouts with Tailwind CSS.
- Using Git commits to track incremental development.

## Future Improvements

Potential future enhancements include:

- Connecting the reservation form to a backend.
- Adding reservation validation and availability checks.
- Integrating an online ordering and cart system.
- Adding automated tests and accessibility improvements.

## Project Status

Front-end learning project — developed incrementally as part of a web development assignment.
