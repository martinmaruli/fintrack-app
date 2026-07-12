const translations = {
  en: {
    // Auth & Navigation
    app_title: "FinTrack — Financial Tracker",
    login_title: "Login to FinTrack",
    register_title: "Register to FinTrack",
    login: "Login",
    register: "Register",
    sign_up_free: "Sign Up Free",
    email: "Email",
    password: "Password",
    pass_hint: "⚠️ Must contain an uppercase letter and a number.",
    cancel: "Cancel",
    save: "Save",
    processing: "Processing...",
    otp_code: "OTP Code",
    otp_msg: "We have sent a 6-digit OTP code to your email (check Ethereal Email for dev). Enter the code below.",
    verify_otp: "Verify OTP",
    pin_security: "Security PIN",
    pin_setup_msg: "Create a 6-digit security PIN to secure your account.",
    pin_verify_msg: "Enter your 6-digit security PIN.",
    save_pin: "Save PIN",
    verify_pin: "Verify PIN",
    
    // Auth Messages
    err_occurred: "An error occurred.",
    reg_success: "OTP has been sent to your email.",
    email_verified: "Email verified. Please create a PIN.",
    
    // Landing Page
    hero_badge: "Free & Secure",
    hero_title: "Manage <span>Finances</span><br>Smarter",
    hero_sub: "Track income, expenses, accounts, and financial projections in one place. Synced across all devices.",
    hero_cta_start: "Get Started — Free",
    hero_cta_login: "Already have an account",
    feat_title: "Everything you need",
    feat_sub: "Complete features for organized personal financial management",
    f1_t: "Multi Accounts & Wallets",
    f1_s: "Manage bank, e-wallets, and cash in one neat dashboard.",
    f2_t: "Financial Projections",
    f2_s: "Estimate end-of-month balance based on routine income and expenses.",
    f3_t: "Recurring Transactions",
    f3_s: "Set up installments or subscriptions once, calculated automatically every period.",
    f4_t: "Visual Reports",
    f4_s: "Analyze expenses by category and account briefly.",
    f5_t: "Multi Device Access",
    f5_s: "Data stored in the cloud, access from phone, laptop, or tablet anytime.",
    f6_t: "Secure & Encrypted",
    f6_s: "Passwords are hashed with bcrypt. Your data cannot be accessed by others.",
    footer: "© 2026 FinTrack  ·  Made with ❤️ for better organized finances",

    // Dashboard Base
    logout: "Logout",
    logout_confirm: "Logout from FinTrack?",
    add_transaction: "Add Transaction",
    edit_transaction: "Edit Transaction",
    add_account: "Add Account",
    add: "Add",
    total_balance: "Total Balance",
    final_projection: "Final Projection",
    all_accounts: "All accounts",
    proj_in_out: "Projected In − Projected Out",
    actual_balance: "Actual Balance",
    proj_balance: "Projection Balance",
    proj_balance_desc: "Actual balance + all projections this period",
    actual_income: "Actual Income",
    actual_expense: "Actual Expense",
    total_balance_acc: "Total Balance Account",
    
    // Sidebar
    nav_dashboard: "Dashboard",
    nav_transaction: "Transaction",
    nav_accounts: "Bank & Wallet",
    nav_income: "Income",
    nav_outcome: "Outcome",
    income: "Income",
    expense: "Expense",
    nav_proj_in: "Projected Income",
    nav_proj_out: "Projected Outcome",
    nav_report: "Report",
    
    // Headers
    dash_desc: "Your financial summary",
    acc_desc: "Manage all your financial accounts",
    inc_desc: "Income that has been received",
    out_desc: "Expenses that have occurred",
    pi_desc: "Income template — can repeat automatically",
    po_desc: "Subscriptions, installments, debt — can repeat automatically",
    rep_desc: "Complete financial reports",

    // Views
    recent_trx: "Recent Transactions",
    recent_act: "Recent activity",
    
    // Table Headers & Labels
    desc: "Description",
    account: "Account",
    category: "Category",
    type: "Type",
    date: "Date",
    amount: "Amount",
    action: "Action",
    note: "Note",
    recurrence: "Recurrence",
    start: "Start",
    limit: "Limit",
    per_period: "Per Period",
    custom_cat: "Custom Category",
    days_count: "Number of Days",
    end_date: "End Date",
    optional: "(optional)",
    close: "Close",
    edit: "Edit",
    delete: "Delete",

    // Empty States
    no_accounts: "No accounts yet",
    add_acc_first: "Add an account or wallet first",
    no_trx: "No transactions yet",
    click_add_trx: "Click Add Transaction to start",
    no_data: "No data yet",
    no_exp_acc: "No expenses from any account",

    // Reports
    exp_by_cat: "Expense by Category",
    inc_by_cat: "Income by Category",
    exp_by_acc: "Expense by Account",
    acc_most_used: "Which account is most used",

    // Prompts
    delete_acc_confirm: "Delete account '{name}' and its {count} related transactions?",
    delete_trx_confirm: "Delete this transaction?",

    // Periods
    all: "All",
    today: "Today",
    this_month: "This Month",
    last_month: "Last Month",
    this_year: "This Year",
    
    // Misc
    bank: "Bank",
    ewallet: "E-Wallet",
    cash: "Cash",
    once: "Once",
    unlimited: "Unlimited",
    next: "Next:",
    data_exported: "Data exported",
    monthly: "Monthly",
    weekly: "Weekly",
    every: "Every",
    days: "Days",
    see_all: "See All",
    placeholder_desc: "e.g. Monthly Salary",
    select_account: "— Select account —",
    placeholder_cat: "Type category...",
    auto_recurrence: "Automatic Recurrence",
    frequency: "Frequency",
    every_month: "Every Month",
    custom_days: "Custom (Days)",
    amount_days: "Amount Days",
    placeholder_cth_5: "e.g. 5",
    max_recurrence: "Max Recurrence",
    placeholder_cth_12: "e.g. 12",
    fill_opts_prev: "Fill options above for preview.",
    max: "Max",
    ends: "Ends",
    acc_name: "Account Name",
    placeholder_acc: "e.g. BCA Savings",
    color: "Color",
    emoji_icon: "Emoji / Icon",
    one_char: "(1 character)",
    init_balance: "Initial Balance (Rp)",
    recent_trx: "Recent Transactions",
    recent_act: "Recent activity",
    no_trx: "No transactions yet",
    forgot_password: "Forgot Password?",
    forgot_pin: "Forgot PIN?",
    reset_password: "Reset Password",
    enter_new_password: "Enter new password",
    send_otp: "Send OTP",
    pass_reset_success: "Password successfully reset. Please login."
  },
  id: {
    // Auth & Navigation
    app_title: "FinTrack — Pencatat Keuangan",
    login_title: "Masuk ke FinTrack",
    register_title: "Daftar FinTrack",
    login: "Masuk",
    register: "Daftar",
    sign_up_free: "Daftar Gratis",
    email: "Email",
    password: "Password",
    pass_hint: "⚠️ Harus mengandung huruf kapital dan angka.",
    cancel: "Batal",
    save: "Simpan",
    processing: "Memproses...",
    otp_code: "Kode OTP",
    otp_msg: "Kami telah mengirimkan 6-digit kode OTP ke email Anda (cek Ethereal Email untuk dev). Masukkan kode tersebut di bawah ini.",
    verify_otp: "Verifikasi OTP",
    pin_security: "PIN Keamanan",
    pin_setup_msg: "Buat 6-digit PIN keamanan Anda untuk mengamankan akun.",
    pin_verify_msg: "Masukkan 6-digit PIN keamanan Anda.",
    save_pin: "Simpan PIN",
    verify_pin: "Verifikasi PIN",
    
    // Auth Messages
    err_occurred: "Terjadi kesalahan.",
    reg_success: "OTP telah dikirim ke email Anda.",
    email_verified: "Email terverifikasi. Silakan buat PIN.",

    // Landing Page
    hero_badge: "Gratis & Aman",
    hero_title: "Kelola <span>Keuangan</span><br>Kamu Lebih Cerdas",
    hero_sub: "Catat pemasukan, pengeluaran, rekening, dan proyeksi keuangan dalam satu tempat. Sinkron di semua device.",
    hero_cta_start: "Mulai Sekarang — Gratis",
    hero_cta_login: "Sudah punya akun",
    feat_title: "Semua yang kamu butuhkan",
    feat_sub: "Fitur lengkap untuk manajemen keuangan pribadi yang lebih teratur",
    f1_t: "Multi Rekening & Dompet",
    f1_s: "Kelola bank, e-wallet, dan tunai dalam satu dashboard yang rapi.",
    f2_t: "Proyeksi Keuangan",
    f2_s: "Estimasi saldo akhir bulan berdasarkan pemasukan dan pengeluaran rutin.",
    f3_t: "Transaksi Berulang",
    f3_s: "Set cicilan atau langganan sekali, terhitung otomatis setiap periode.",
    f4_t: "Laporan Visual",
    f4_s: "Analisis pengeluaran per kategori dan per rekening secara ringkas.",
    f5_t: "Akses Multi Device",
    f5_s: "Data tersimpan di cloud, buka dari HP, laptop, atau tablet kapan saja.",
    f6_t: "Aman & Terenkripsi",
    f6_s: "Password di-hash dengan bcrypt. Data kamu tidak bisa diakses orang lain.",
    footer: "© 2026 FinTrack  ·  Dibuat dengan ❤️ untuk keuangan yang lebih teratur",

    // Dashboard Base
    logout: "Keluar",
    logout_confirm: "Keluar dari FinTrack?",
    add_transaction: "Tambah Transaksi",
    edit_transaction: "Edit Transaksi",
    add_account: "Tambah Akun",
    add: "Tambah",
    total_balance: "Total Saldo",
    final_projection: "Proyeksi Akhir",
    all_accounts: "Semua rekening",
    proj_in_out: "Proyeksi Masuk − Proyeksi Keluar",
    actual_balance: "Saldo Aktual",
    proj_balance: "Neraca Proyeksi",
    proj_balance_desc: "Saldo aktual + semua proyeksi periode ini",
    actual_income: "Pemasukan Aktual",
    actual_expense: "Pengeluaran Aktual",
    total_balance_acc: "Total Saldo Rekening",
    
    // Sidebar
    nav_dashboard: "Dashboard",
    nav_transaction: "Transaksi",
    nav_accounts: "Bank & Dompet",
    nav_income: "Pemasukan",
    nav_outcome: "Pengeluaran",
    income: "Pemasukan",
    expense: "Pengeluaran",
    nav_proj_in: "Calon Pemasukan",
    nav_proj_out: "Calon Pengeluaran",
    nav_report: "Laporan",
    
    // Headers
    dash_desc: "Ringkasan keuangan Anda",
    acc_desc: "Kelola semua akun keuangan Anda",
    inc_desc: "Uang masuk yang sudah diterima",
    out_desc: "Pengeluaran yang sudah terjadi",
    pi_desc: "Template pemasukan — bisa berulang otomatis",
    po_desc: "Langganan, cicilan, hutang — bisa berulang",
    rep_desc: "Laporan keuangan lengkap",

    // Views
    recent_trx: "Transaksi Terakhir",
    recent_act: "Aktivitas terbaru",
    
    // Table Headers & Labels
    desc: "Deskripsi",
    account: "Akun",
    category: "Kategori",
    type: "Jenis",
    date: "Tanggal",
    amount: "Jumlah",
    action: "Aksi",
    note: "Catatan",
    recurrence: "Pengulangan",
    start: "Mulai",
    limit: "Batas",
    per_period: "Per Periode",
    custom_cat: "Kategori Kustom",
    days_count: "Jumlah Hari",
    end_date: "Tanggal Berakhir",
    optional: "(opsional)",
    close: "Tutup",
    edit: "Edit",
    delete: "Hapus",

    // Empty States
    no_accounts: "Belum ada akun",
    add_acc_first: "Tambah rekening atau dompet dulu",
    no_trx: "Belum ada transaksi",
    click_add_trx: "Klik Tambah Transaksi untuk mulai",
    no_data: "Belum ada data",
    no_exp_acc: "Belum ada pengeluaran dengan akun",

    // Reports
    exp_by_cat: "Pengeluaran per Kategori",
    inc_by_cat: "Pemasukan per Kategori",
    exp_by_acc: "Pengeluaran per Akun",
    acc_most_used: "Rekening mana paling banyak digunakan",

    // Prompts
    delete_acc_confirm: "Hapus akun '{name}' beserta {count} transaksi terkait?",
    delete_trx_confirm: "Hapus transaksi ini?",

    // Periods
    all: "Semua",
    today: "Hari Ini",
    this_month: "Bulan Ini",
    last_month: "Bulan Lalu",
    this_year: "Tahun Ini",
    
    // Misc
    bank: "Bank",
    ewallet: "E-Wallet",
    cash: "Tunai",
    once: "Sekali",
    unlimited: "Tanpa batas",
    next: "Berikutnya:",
    data_exported: "Data diekspor",
    monthly: "Bulanan",
    weekly: "Mingguan",
    every: "Tiap",
    days: "Hari",
    see_all: "Lihat Semua",
    placeholder_desc: "Contoh: Gaji Bulanan",
    select_account: "— Pilih akun —",
    placeholder_cat: "Ketik kategori...",
    auto_recurrence: "Recurrence Otomatis",
    frequency: "Frekuensi",
    every_month: "Setiap Bulan",
    custom_days: "Custom (Hari)",
    amount_days: "Jumlah Hari",
    placeholder_cth_5: "cth: 5",
    max_recurrence: "Maks Recurrence",
    placeholder_cth_12: "cth: 12",
    fill_opts_prev: "Isi opsi di atas untuk preview.",
    max: "Maks",
    ends: "Berakhir",
    acc_name: "Nama Akun",
    placeholder_acc: "Contoh: BCA Savings",
    color: "Warna",
    emoji_icon: "Emoji / Ikon",
    one_char: "(1 karakter)",
    init_balance: "Saldo Awal (Rp)",
    recent_trx: "Riwayat Transaksi",
    recent_act: "Aktivitas terbaru",
    no_trx: "Belum ada transaksi",
    forgot_password: "Lupa Password?",
    forgot_pin: "Lupa PIN?",
    reset_password: "Reset Password",
    enter_new_password: "Masukkan password baru",
    send_otp: "Kirim OTP",
    pass_reset_success: "Password berhasil di-reset. Silakan login."
  }
};

let currentLang = localStorage.getItem('ft_lang') || 'en';

function t(key, vars = {}) {
  let str = translations[currentLang][key] || key;
  for (const [k, v] of Object.entries(vars)) {
    str = str.replace(`{${k}}`, v);
  }
  return str;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ft_lang', lang);
  updateDOMTranslations();
}

function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'id' : 'en');
  // Dispatch event so app.js can re-render dynamic tables
  window.dispatchEvent(new Event('languageChanged'));
}

function updateDOMTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      if (el.tagName === 'INPUT' && el.type === 'text' || el.type === 'password' || el.type === 'email') {
        el.placeholder = translations[currentLang][key];
      } else {
        // preserve innerHTML tags if they exist in translation
        el.innerHTML = translations[currentLang][key];
      }
    }
  });
  // Also update document title if present
  if (translations[currentLang]['app_title']) {
    document.title = translations[currentLang]['app_title'];
  }
}

// Initial update on load
document.addEventListener('DOMContentLoaded', updateDOMTranslations);
