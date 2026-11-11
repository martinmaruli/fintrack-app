window.FinTrackModules = window.FinTrackModules || {};

window.FinTrackModules.dashboard = {
  template: function() {
    return '<div class="kg">'
      + '<div class="kc ki"><div class="kl"><i data-lucide="arrow-down-circle"></i><span data-i18n="income">Income</span></div><div class="kv" id="kv-i">Rp 0</div><div class="km" id="km-i">0 <span data-i18n="trx_label">Transactions</span></div></div>'
      + '<div class="kc ke"><div class="kl"><i data-lucide="arrow-up-circle"></i><span data-i18n="expense">Expense</span></div><div class="kv" id="kv-e">Rp 0</div><div class="km" id="km-e">0 <span data-i18n="trx_label">Transactions</span></div></div>'
      + '<div class="kc kb"><div class="kl"><i data-lucide="wallet"></i><span data-i18n="total_balance">Total Balance</span></div><div class="kv" id="kv-b">Rp 0</div><div class="km" data-i18n="all_accounts">All accounts</div></div>'
      + '<div class="kc kp"><div class="kl"><i data-lucide="calculator"></i><span data-i18n="final_projection">Final Projection</span></div><div class="kv" id="kv-p">Rp 0</div><div class="km" id="km-p" data-i18n="proj_in_out">Projected In − Projected Out</div></div>'
      + '</div>'
      + '<div>'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s3)">'
      + '<div style="font-size:var(--sm);font-weight:600" data-i18n="nav_accounts">Accounts &amp; Wallets</div>'
      + '<button class="btn bg bsm" onclick="gv(\'akun\', document.querySelectorAll(\'.nit\')[1])"><i data-lucide="arrow-right"></i><span data-i18n="see_all">See All</span></button>'
      + '</div>'
      + '<div class="acc-grid" id="dash-acc"></div>'
      + '</div>'
      + '<div class="g2">'
      + '<div class="card" style="display:flex;flex-direction:column">'
      + '<div class="ch"><div><div class="ct" data-i18n="nav_proj_in">Projected Income</div><div class="cs" id="lbl-cm">Rp 0 <span data-i18n="projected">projected</span></div></div><span class="badge bgld"><i data-lucide="trending-up"></i><span data-i18n="projection">Projection</span></span></div>'
      + '<div id="prev-cm" style="flex:1"></div>'
      + '<div style="margin-top:var(--s4);padding-top:var(--s3);border-top:1px solid var(--div);display:flex;justify-content:center">'
      + '<button class="btn bg bsm" onclick="gv(\'cp\')"><i data-lucide="arrow-down"></i><span data-i18n="see_all">See All</span></button>'
      + '</div>'
      + '</div>'
      + '<div class="card" style="display:flex;flex-direction:column">'
      + '<div class="ch"><div><div class="ct" data-i18n="nav_proj_out">Projected Expense</div><div class="cs" id="lbl-ck">Rp 0 <span data-i18n="projected">projected</span></div></div><span class="badge bora"><i data-lucide="trending-down"></i><span data-i18n="projection">Projection</span></span></div>'
      + '<div id="prev-ck" style="flex:1"></div>'
      + '<div style="margin-top:var(--s4);padding-top:var(--s3);border-top:1px solid var(--div);display:flex;justify-content:center">'
      + '<button class="btn bg bsm" onclick="gv(\'ck\')"><i data-lucide="arrow-down"></i><span data-i18n="see_all">See All</span></button>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '<div class="card">'
      + '<div class="ch"><div><div class="ct" data-i18n="recent_trx">Recent Transactions</div><div class="cs" data-i18n="recent_act">Recent activity</div></div></div>'
      + '<div class="tw"><table><thead><tr><th data-i18n="desc">Description</th><th data-i18n="account">Account</th><th data-i18n="category">Category</th><th data-i18n="type">Type</th><th data-i18n="date">Date</th><th style="text-align:right">Amount</th></tr></thead><tbody id="tb-dash"></tbody></table></div>'
      + '<div style="margin-top:var(--s4);padding-top:var(--s3);border-top:1px solid var(--div);display:flex;justify-content:center">'
      + '<button class="btn bg bsm" onclick="gv(\'income\')"><i data-lucide="arrow-down"></i><span data-i18n="see_all">See All</span></button>'
      + '</div>'
      + '</div>';
  },

  render: function(ctx) {
    setKV('kv-i', ctx.mi);
    setKV('kv-e', ctx.me);
    setKV('kv-b', ctx.bal);
    setKV('kv-p', ctx.proj);

    var kmPEl = document.getElementById('km-p');
    if (kmPEl) {
      var sign = ctx.netProj >= 0 ? '+' : '-';
      kmPEl.textContent = t('net_proj_this_month') + ': ' + sign + rpf(Math.abs(ctx.netProj));
    }
    var kmIEl = document.getElementById('km-i');
    if (kmIEl) kmIEl.textContent = ctx.fil.filter(function(x){return x.type==='income';}).length + ' ' + t('nav_transaction').toLowerCase();
    var kmEEl = document.getElementById('km-e');
    if (kmEEl) kmEEl.textContent = ctx.fil.filter(function(x){return x.type==='expense';}).length + ' ' + t('nav_transaction').toLowerCase();
    var lblCmEl = document.getElementById('lbl-cm');
    if (lblCmEl) lblCmEl.textContent = rpf(ctx.cm) + ' ' + t('nav_proj_in').toLowerCase();
    var lblCkEl = document.getElementById('lbl-ck');
    if (lblCkEl) lblCkEl.textContent = rpf(ctx.ck) + ' ' + t('nav_proj_out').toLowerCase();

    renderAccCards('dash-acc', true);
    renderPreview('prev-cm', ctx.sortedDB.filter(function(trx){return trx.type==='projected_income';}), 'tci');
    renderPreview('prev-ck', ctx.sortedDB.filter(function(trx){return trx.type==='projected_expense';}), 'tce');
    renderDashTable('tb-dash', ctx.sortedDB.slice(0, 8));
  }
};
