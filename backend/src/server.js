const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Attempt to listen, with auto‑fallback to next ports if busy
const basePort = parseInt(process.env.PORT, 10) || 5000;
let currentPort = basePort;
let listener;
const maxRetries = 3;
let retries = 0;

function handleListenError(err) {
  if ((err.code === 'EADDRINUSE' || err.code === 'EPERM') && retries < maxRetries) {
    console.warn(`Port ${currentPort} in use, trying ${currentPort + 1}...`);
    retries += 1;
    currentPort += 1;
    startServer();
  } else {
    console.error(err);
    process.exit(1);
  }
}

function startServer() {
  try {
    listener = app.listen(currentPort, () => {
      console.log(`Server running on port ${currentPort}`);
    });
  } catch (err) {
    handleListenError(err);
    return;
  }
  listener.on('error', handleListenError);
}

startServer();