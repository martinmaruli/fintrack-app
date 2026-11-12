window.FinTrackModules = window.FinTrackModules || {};

window.FinTrackModules.accounts = {
  template: function() {
    return '<div style="display:flex;align-items:center;justify-content:space-between">'
      + '<div><div class="pgtit" style="font-size:var(--base)" data-i18n="acc_view_title">Accounts &amp; Wallets</div><div class="pgsub" data-i18n="acc_desc">Manage all your financial accounts</div></div>'
      + '<button class="btn bp bsm" onclick="openModalAcc()"><i data-lucide="plus"></i><span data-i18n="add_acc_btn">Add Account</span></button>'
      + '</div>'
      + '<div class="acc-grid" id="acc-grid-full"></div>'
      + '<div class="card" id="acc-trx-card" style="display:none">'
      + '<div class="ch">'
      + '<div><div class="ct" id="acc-trx-title">Transaksi</div><div class="cs" id="acc-trx-sub"></div></div>'
      + '<button class="btn bg bsm" onclick="document.getElementById(\'acc-trx-card\').style.display=\'none\'"><i data-lucide="x"></i><span data-i18n="close">Close</span></button>'
      + '</div>'
      + '<div class="tw"><table><thead><tr><th data-i18n="desc">Description</th><th data-i18n="amount">Amount</th><th data-i18n="category">Category</th><th data-i18n="date">Date</th><th data-i18n="note">Note</th></tr></thead><tbody id="tb-acc-trx"></tbody></table></div>'
      + '</div>';
  },

  render: function(ctx) {
    renderAccCards('acc-grid-full', false);
  }
};
