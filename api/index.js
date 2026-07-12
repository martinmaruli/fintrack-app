require('dotenv').config();
const express     = require('express');
const helmet      = require('helmet');
const cors        = require('cors');
const rateLimit   = require('express-rate-limit');
const path        = require('path');

const app = express();

app.set('trust proxy', 1);

// Security headers — relaxed for same-domain deployment
app.use(helmet({
  contentSecurityPolicy: false,
}));

// CORS: allow same-origin (no external domains needed since frontend + backend are on same Vercel URL)
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: false, limit: '50kb' }));

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Terlalu banyak request. Coba lagi dalam 1 menit.' },
  standardHeaders: true,
  legacyHeaders: false,
}));

// API routes
app.use('/api/auth',         require('../routes/auth'));
app.use('/api/accounts',     require('../routes/accounts'));
app.use('/api/transactions', require('../routes/transactions'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', ts: Date.now() }));

// Catch-all for unknown API paths
app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint tidak ditemukan.' }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Terjadi kesalahan server.' });
});

// Export for Vercel serverless
module.exports = app;
