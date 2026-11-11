const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { query } = require('../db');
const { requireAuth } = require('../middleware/auth');
const { encrypt, encryptDeterministic } = require('../services/encryption');
const { decryptRow } = require('./helpers');

const router = express.Router();
router.use(requireAuth);

const TYPES = ['pemasukan','pengeluaran','calon_pemasukan','calon_pengeluaran'];
const FREQS = ['monthly'];

const rules = [
  body('desc').trim().notEmpty().withMessage('Deskripsi wajib diisi.').isLength({ max: 200 }),
  body('amt').isFloat({ min: 0.01 }).withMessage('Jumlah harus lebih dari 0.'),
  body('type').isIn(TYPES).withMessage('Tipe tidak valid.'),
  body('cat').trim().notEmpty().withMessage('Kategori wajib diisi.').isLength({ max: 100 }),
  body('date').isDate().withMessage('Format tanggal tidak valid.'),
  body('note').optional({ nullable: true }).trim().isLength({ max: 500 }),
  body('acc_id').optional({ nullable: true }).isInt({ min: 1 }),
  body('rec').optional().isBoolean(),
  body('freq').optional({ nullable: true }).custom(value => {
    if (!value || value === 'monthly' || value === 'weekly') return true;
    if (/^custom_\d+$/.test(value)) {
      const days = parseInt(value.split('_')[1], 10);
      if (days > 0) return true;
    }
    throw new Error('Frekuensi tidak valid.');
  }),
  body('cnt').optional({ nullable: true, checkFalsy: true }).custom(v => {
    if (v === null || v === undefined || v === '') return true;
    const n = Number(v);
    if (Number.isInteger(n) && n >= 1 && n <= 360) return true;
    throw new Error('Jumlah pengulangan tidak valid.');
  }),
  body('end_date').optional({ nullable: true, checkFalsy: true }).isDate().withMessage('Format tanggal selesai tidak valid.'),
];

router.get('/', async (req, res) => {
  try {
    const r = await query(
      `SELECT t.*, a.name AS account_name FROM transactions t
       LEFT JOIN accounts a ON t.acc_id = a.id AND a.user_id = $1
       WHERE t.user_id = $1 ORDER BY t.date DESC, t.id DESC`,
      [req.user.id]
    );
    res.json(r.rows.map(decryptRow));
  } catch (e) { res.status(500).json({ error: 'Gagal memuat transaksi.' }); }
});

// New menu-specific API routes
router.get('/summary', async (req, res) => {
  try {
    const now = new Date(Date.now() + 7 * 3600000);
    const today = now.toISOString().split('T')[0];
    const y = now.getFullYear(), m = now.getMonth();
    const cmFrom = y + '-' + String(m + 1).padStart(2, '0') + '-01';
    const cmTo = y + '-' + String(m + 1).padStart(2, '0') + '-' + String(new Date(y, m + 1, 0).getDate()).padStart(2, '0');

    const r = await query(`SELECT type, amt, date, note FROM transactions WHERE user_id = $1`, [req.user.id]);
    let income = 0, expense = 0, projected_income = 0, projected_expense = 0;

    r.rows.forEach(row => {
      const dt = decryptDeterministic(row.type);
      const amt = parseFloat(row.amt) || 0;
      const rowDate = typeof row.date === 'string' ? row.date.split('T')[0] : (row.date ? new Date(row.date).toISOString().split('T')[0] : '');
      const note = decrypt(row.note) || '';

      if (dt === 'pemasukan') {
        if (!rowDate || rowDate <= today) income += amt;
      } else if (dt === 'pengeluaran') {
        if (!rowDate || rowDate <= today) expense += amt;
      } else if (dt === 'calon_pemasukan' || dt === 'calon_pengeluaran') {
        const isStopped = note.includes('[PAUSED]') || note.includes('[STOPPED]');
        if (!isStopped && rowDate >= cmFrom && rowDate <= cmTo) {
          if (dt === 'calon_pemasukan') projected_income += amt;
          else projected_expense += amt;
        }
      }
    });

    const accR = await query(`SELECT SUM(init) as total_init FROM accounts WHERE user_id = $1`, [req.user.id]);
    const initBal = parseFloat(accR.rows[0]?.total_init) || 0;
    const balance = initBal + income - expense;
    res.json({
      income,
      expense,
      projected_income,
      projected_expense,
      balance,
      projected_balance: balance + projected_income - projected_expense
    });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Gagal memuat summary.' }); }
});
router.use('/dashboard', require('./dashboard'));
router.use('/income', require('./income'));
router.use('/outcome', require('./outcome'));
router.use('/projected-income', require('./projected-income'));
router.use('/projected-outcome', require('./projected-outcome'));
router.use('/report', require('./report'));

router.post('/auto-process', async (req, res) => {
  try {
    const today = req.body.today || new Date(Date.now() + 7 * 3600000).toISOString().split('T')[0];
    const r = await query(
      `SELECT * FROM transactions
       WHERE user_id = $1 AND type IN ($2, $3)
       AND date <= $4 AND rec = true`,
      [req.user.id, encryptDeterministic('calon_pemasukan'), encryptDeterministic('calon_pengeluaran'), today]
    );

    let processedCount = 0;

    const parseYMD = (d) => {
      if (!d) return null;
      if (typeof d === 'string') {
        const [y, m, day] = d.split('T')[0].split('-').map(Number);
        return new Date(y, m - 1, day);
      }
      const dt = new Date(d);
      return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    };

    const formatYMD = (dt) => {
      return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
    };

    for (let t of r.rows) {
      const actualType = decryptDeterministic(t.type) === 'calon_pemasukan' ? 'pemasukan' : 'pengeluaran';
      let currDt = parseYMD(t.date);
      let currentFormatDate = formatYMD(currDt);

      let decryptedNote = decrypt(t.note) || '';
      let isPaused = decryptedNote.includes('[PAUSED]');
      let isStopped = decryptedNote.includes('[STOPPED]');

      if (isPaused || isStopped) {
        continue;
      }

      let iters = 0;
      let stopped = false;
      let nextCntStr = t.cnt ? String(t.cnt) : null;
      let latestNote = decryptedNote;

      while (currentFormatDate <= today && iters < 100) {
        iters++;
        const newNote = decryptedNote ? decryptedNote + ' (Auto)' : '(Auto)';
        await query(
          `INSERT INTO transactions (description, amt, type, cat, date, note, acc_id, user_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [encrypt(decrypt(t.description)), t.amt, encryptDeterministic(actualType), encrypt(decrypt(t.cat)), currentFormatDate, encrypt(newNote), t.acc_id, req.user.id]
        );
        processedCount++;

        if (t.freq === 'monthly') currDt.setMonth(currDt.getMonth() + 1);
        else if (t.freq === 'weekly') currDt.setDate(currDt.getDate() + 7);
        else if (t.freq && t.freq.startsWith('custom_')) currDt.setDate(currDt.getDate() + parseInt(t.freq.split('_')[1], 10));
        else { stopped = true; break; }

        currentFormatDate = formatYMD(currDt);

        if (t.end_date) {
          const edStr = formatYMD(parseYMD(t.end_date));
          if (currentFormatDate > edStr) {
            stopped = true;
            break;
          }
        }

        if (nextCntStr) {
          const c = parseInt(nextCntStr, 10);
          if (!isNaN(c)) {
            if (c <= 1) {
              stopped = true;
              nextCntStr = '0';
              break;
            } else {
              nextCntStr = (c - 1).toString();
            }
          }
        }
      }

      if (stopped && !latestNote.includes('[STOPPED]')) {
        latestNote = '[STOPPED] ' + latestNote;
      }

      await query(
        `UPDATE transactions SET date = $1, cnt = $2, note = $3 WHERE id = $4`,
        [currentFormatDate, nextCntStr, encrypt(latestNote.trim()), t.id]
      );
    }

    res.json({ success: true, processed: processedCount });
  } catch (e) {
    console.error('Auto-process error:', e);
    res.status(500).json({ error: 'Gagal memproses proyeksi otomatis.' });
  }
});

router.post('/', rules, async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(422).json({ error: err.array()[0].msg });
  const { desc, amt, type, cat, date, note, acc_id, rec, freq, cnt, end_date } = req.body;
  if (acc_id) {
    const chk = await query('SELECT id FROM accounts WHERE id=$1 AND user_id=$2', [acc_id, req.user.id]);
    if (!chk.rows.length) return res.status(403).json({ error: 'Akun tidak ditemukan.' });
  }
  try {
    const safeCnt = (cnt !== undefined && cnt !== null && cnt !== '') ? String(cnt) : null;
    const safeEndDate = end_date || null;
    const r = await query(
      `INSERT INTO transactions (description,amt,type,cat,date,note,acc_id,rec,freq,cnt,end_date,user_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [encrypt(desc), parseFloat(amt), encryptDeterministic(type), encrypt(cat), date, note ? encrypt(note) : null, acc_id||null, !!rec, freq||null, safeCnt, safeEndDate, req.user.id]
    );
    res.status(201).json(decryptRow(r.rows[0]));
  } catch (e) { res.status(500).json({ error: 'Gagal menyimpan transaksi.' }); }
});

router.put('/:id', [param('id').isInt(), ...rules], async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(422).json({ error: err.array()[0].msg });
  const { desc, amt, type, cat, date, note, acc_id, rec, freq, cnt, end_date } = req.body;
  if (acc_id) {
    const chk = await query('SELECT id FROM accounts WHERE id=$1 AND user_id=$2', [acc_id, req.user.id]);
    if (!chk.rows.length) return res.status(403).json({ error: 'Akun tidak ditemukan.' });
  }
  try {
    const safeCnt = (cnt !== undefined && cnt !== null && cnt !== '') ? String(cnt) : null;
    const safeEndDate = end_date || null;
    const r = await query(
      `UPDATE transactions SET description=$1,amt=$2,type=$3,cat=$4,date=$5,
       note=$6,acc_id=$7,rec=$8,freq=$9,cnt=$10,end_date=$11
       WHERE id=$12 AND user_id=$13 RETURNING *`,
      [encrypt(desc), parseFloat(amt), encryptDeterministic(type), encrypt(cat), date, note ? encrypt(note) : null, acc_id||null, !!rec,
       freq||null, safeCnt, safeEndDate, parseInt(req.params.id), req.user.id]
    );
    if (!r.rows.length) return res.status(404).json({ error: 'Transaksi tidak ditemukan.' });
    res.json(decryptRow(r.rows[0]));
  } catch (e) { res.status(500).json({ error: 'Gagal memperbarui transaksi.' }); }
});

router.delete('/:id', param('id').isInt(), async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(422).json({ error: 'ID tidak valid.' });
  try {
    const r = await query('DELETE FROM transactions WHERE id=$1 AND user_id=$2 RETURNING id',
      [parseInt(req.params.id), req.user.id]);
    if (!r.rows.length) return res.status(404).json({ error: 'Transaksi tidak ditemukan.' });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: 'Gagal menghapus transaksi.' }); }
});

router.decryptRow = decryptRow;
module.exports = router;
