const fs = require('fs');
let i18n = fs.readFileSync('public/i18n.js', 'utf8');

const additionsEN = `
    custom_cat: "Custom Category",
    auto_recurrence: "Automatic Recurrence",
    every_month: "Every Month",
    custom_days: "Custom (Days)",
    custom: "Custom",
    max_count: "Max Count",
    trx_updated: "Transaction updated!",
    acc_updated: "Account updated!",
    data_exported: "Data exported successfully!",
    paused: "Paused",
    resumed: "Resumed",
    stopped: "Stopped",
    select_acc: "— Select account —",
`;

const additionsID = `
    custom_cat: "Kategori Kustom",
    auto_recurrence: "Perulangan Otomatis",
    every_month: "Setiap Bulan",
    custom_days: "Kustom (Hari)",
    custom: "Kustom",
    max_count: "Batas Jumlah",
    trx_updated: "Transaksi diperbarui!",
    acc_updated: "Akun diperbarui!",
    data_exported: "Data berhasil diekspor!",
    paused: "Di-pause",
    resumed: "Diaktifkan kembali",
    stopped: "Dihentikan",
    select_acc: "— Pilih akun —",
`;

let parts = i18n.split('// Categories & Types');
i18n = parts[0] + additionsEN + '\n    // Categories & Types' + parts[1] + additionsID + '\n    // Categories & Types' + parts[2];

fs.writeFileSync('public/i18n.js', i18n);
console.log('Done i18n fixes');
