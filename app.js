const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

// Main endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Fly.io!' });
});

// Health check endpoint for Kubernetes
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Readiness probe endpoint
app.get('/ready', (req, res) => {
  res.json({ ready: true });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Try accessing: http://localhost:${PORT}/`);
});
