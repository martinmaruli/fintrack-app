const express = require('express');
const { query } = require('../db');
const { requireAuth } = require('../middleware/auth');
const { decryptRow } = require('./helpers');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const r = await query(
      `SELECT t.*, a.name AS account_name FROM transactions t
       LEFT JOIN accounts a ON t.acc_id = a.id AND a.user_id = $1
       WHERE t.user_id = $1 ORDER BY t.date DESC, t.id DESC`,
      [req.user.id]
    );
    res.json(r.rows.map(decryptRow));
  } catch (e) {
    res.status(500).json({ error: 'Gagal memuat report.' });
  }
});

module.exports = router;
