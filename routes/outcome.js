const express = require('express');
const { query } = require('../db');
const { requireAuth } = require('../middleware/auth');
const { encryptDeterministic } = require('../services/encryption');
const { decryptRow } = require('./helpers');

const router = express.Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const r = await query(
      `SELECT t.*, a.name AS account_name FROM transactions t
       LEFT JOIN accounts a ON t.acc_id = a.id AND a.user_id = $1
       WHERE t.user_id = $1 AND t.type = $2 ORDER BY t.date DESC, t.id DESC`,
      [req.user.id, encryptDeterministic('pengeluaran')]
    );
    res.json(r.rows.map(decryptRow));
  } catch (e) {
    res.status(500).json({ error: 'Gagal memuat outcome.' });
  }
});

module.exports = router;
