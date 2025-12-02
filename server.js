const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from dist folder (built React app) if available.
const distDir = path.join(__dirname, 'dist');
const indexHtml = path.join(distDir, 'index.html');
const hasDist = fs.existsSync(indexHtml);

if (hasDist) {
  app.use(express.static(distDir));
} else {
  // If frontend hasn't been built yet, warn and provide a helpful message at root.
  console.warn('Warning: frontend `dist` directory not found. Build the frontend with `npm run build:frontend` or run the frontend dev server.');
  app.get('/', (req, res) => {
    res.type('html').send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Frontend not built</title>
          <style>body{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Ubuntu,'Helvetica Neue',sans-serif;margin:3rem;color:#111}</style>
        </head>
        <body>
          <h1>Frontend not built</h1>
          <p>The server is running and API endpoints are available, but the frontend build is missing (<code>./dist/index.html</code>).</p>
          <h2>To build the frontend</h2>
          <pre>npm run build:frontend</pre>
          <p>Or run the dev frontend during development:</p>
          <pre>cd frontend && npm install && npm run dev</pre>
          <h2>API endpoints</h2>
          <ul>
            <li><a href="/api/data">/api/data</a></li>
            <li><a href="/api/health">/api/health</a></li>
          </ul>
        </body>
      </html>
    `);
  });
}

// API Routes
app.get('/api/data', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Catch-all route for SPA - serve index.html for all non-API routes
if (hasDist) {
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(indexHtml);
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/data`);
});
