import express from 'express';

const app = express();
const PORT = 3000;

// A simple endpoint to check whether the API is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Kuro House API is running!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Kuro House API listening on http://localhost:${PORT}`);
});
