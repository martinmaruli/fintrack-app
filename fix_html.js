const fs = require('fs');
let html = fs.readFileSync('public/app.html', 'utf8');

const reps = [
  ['<h3 id="mt-title">Tambah Transaksi</h3>', '<h3 id="mt-title" data-i18n="add_transaction">Tambah Transaksi</h3>'],
  ['placeholder="e.g. Monthly Salary" data-i18n="placeholder_desc"', 'placeholder="e.g. Monthly Salary" data-i18n="desc"'],
  ['placeholder="Type category..." data-i18n="placeholder_cat"', 'placeholder="Type category..." data-i18n="category"'],
  ['<label class="fl">Kategori Kustom</label>', '<label class="fl" data-i18n="custom_cat">Kategori Kustom</label>'],
  ['<div class="rlbl"><i data-lucide="repeat"></i><span>Perulangan Otomatis</span></div>', '<div class="rlbl"><i data-lucide="repeat"></i><span data-i18n="auto_recurrence">Perulangan Otomatis</span></div>'],
  ['<option value="custom">Kustom (Hari)</option>', '<option value="custom" data-i18n="custom_days">Kustom (Hari)</option>'],
  ['<option value="custom">Kustom</option>', '<option value="custom" data-i18n="custom">Kustom</option>'],
  ['<label class="fl">Batas Jumlah <span class="fh">(opsional)</span></label>', '<label class="fl"><span data-i18n="max_count">Batas Jumlah</span> <span class="fh" data-i18n="optional">(opsional)</span></label>'],
  ['<label class="fl">Tanggal Berakhir <span class="fh">(opsional)</span></label>', '<label class="fl"><span data-i18n="end_date">Tanggal Berakhir</span> <span class="fh" data-i18n="optional">(opsional)</span></label>'],
  ['<h3 id="macc-ttl">Tambah Akun</h3>', '<h3 id="macc-ttl" data-i18n="add_account">Tambah Akun</h3>'],
  ['<label class="fl">Nama Akun</label>', '<label class="fl" data-i18n="acc_name">Nama Akun</label>'],
  ['<label class="fl">Warna (Hex)</label>', '<label class="fl" data-i18n="acc_color">Warna</label>'],
  ['<label class="fl">Ikon (Emoji)</label>', '<label class="fl" data-i18n="acc_icon">Ikon (Emoji)</label>'],
  ['<label class="fl">Saldo Awal (Rp)</label>', '<label class="fl" data-i18n="init_balance">Saldo Awal (Rp)</label>'],
  ["document.getElementById('mtrx-ttl').textContent='Edit Transaksi';", "document.getElementById('mtrx-ttl').textContent=t('edit')+' '+t('nav_transaction');"],
  ["toast('Transaksi ditambahkan')", "toast(t('trx_added'))"],
  ["toast('Dihapus')", "toast(t('trx_deleted'))"],
  ["toast('Diperbarui')", "toast(t('trx_updated'))"],
  ["toast('Ditambahkan')", "toast(t('trx_added'))"],
  ["toast('Account ditambahkan')", "toast(t('acc_added'))"],
  ["toast('Account dihapus')", "toast(t('acc_deleted'))"],
  ["toast('Account diperbarui')", "toast(t('acc_updated'))"],
  ["document.getElementById('macc-ttl').textContent='Edit Account';", "document.getElementById('macc-ttl').textContent=t('edit')+' '+t('nav_accounts');"],
  ['<option value="" data-i18n="select_account">— Pilih akun —</option>', '<option value="" data-i18n="select_acc">— Pilih akun —</option>'],
  ["toast('Data berhasil diexpor')", "toast(t('data_exported'))"],
  ["toast(t.note.includes('[PAUSED]') ? 'Di-pause' : 'Diaktifkan kembali')", "toast(t.note.includes('[PAUSED]') ? t('paused') : t('resumed'))"],
  ["toast(t.note.includes('[STOPPED]') ? 'Dihentikan' : 'Diaktifkan kembali')", "toast(t.note.includes('[STOPPED]') ? t('stopped') : t('resumed'))"],
  
  // Also missing translations in i18n.js
  ['<label class="fl" data-i18n="type">Type</label>', '<label class="fl" data-i18n="type">Type</label>'],
  ['<div class="rlbl"><i data-lucide="repeat"></i><span data-i18n="auto_recurrence">Automatic Recurrence</span></div>', '<div class="rlbl"><i data-lucide="repeat"></i><span data-i18n="auto_recurrence">Automatic Recurrence</span></div>']
];

for(let [a,b] of reps) {
  html = html.split(a).join(b);
}

fs.writeFileSync('public/app.html', html);
console.log('Done HTML fixes');
