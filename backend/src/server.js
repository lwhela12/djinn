const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', require('./routes/auth'));
const authMiddleware = require('./middleware/auth');

app.use('/api/sessions', authMiddleware, require('./routes/sessions'));
app.use('/api/chat', authMiddleware, require('./routes/chat'));

app.get('/', (req, res) => {
  res.json({ message: 'Manifestation Journal API' });
});

/** Error handler */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message, stack: process.env.NODE_ENV === 'development' ? err.stack : undefined });
});

// Start the server on the configured PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
server.on('error', (err) => {
  console.error('Server failed to start:', err);
  console.error(`Make sure port ${PORT} is free or set PORT env to another value.`);
  process.exit(1);
});