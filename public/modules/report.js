window.FinTrackModules = window.FinTrackModules || {};

window.FinTrackModules.report = {
  template: function() {
    return '<div class="kg">'
      + '<div class="kc ki"><div class="kl"><i data-lucide="arrow-down-circle"></i><span data-i18n="actual_income">Actual Income</span></div><div class="kv" id="lv-i">Rp 0</div></div>'
      + '<div class="kc ke"><div class="kl"><i data-lucide="arrow-up-circle"></i><span data-i18n="actual_expense">Actual Expense</span></div><div class="kv" id="lv-e">Rp 0</div></div>'
      + '<div class="kc kb"><div class="kl"><i data-lucide="wallet"></i><span data-i18n="actual_balance">Actual Balance</span></div><div class="kv" id="lv-b">Rp 0</div></div>'
      + '<div class="kc kp"><div class="kl"><i data-lucide="calculator"></i><span data-i18n="final_projection">Final Projection</span></div><div class="kv" id="lv-p">Rp 0</div></div>'
      + '</div>'
      + '<div class="card">'
      + '<div class="ch"><div class="ct" data-i18n="exp_by_acc">Expense by Account</div><div class="cs" data-i18n="acc_most_used">Which account is most used</div></div>'
      + '<div id="lap-acc"></div>'
      + '</div>'
      + '<div class="card">'
      + '<div class="ch"><div><div class="ct" data-i18n="recent_trx">Recent Transactions</div><div class="cs" data-i18n="recent_act">Recent activity</div></div></div>'
      + '<div class="tw"><table><thead><tr><th data-i18n="desc">Description</th><th data-i18n="amount">Amount</th><th data-i18n="account">Account</th><th data-i18n="category">Category</th><th data-i18n="type">Type</th><th data-i18n="date">Date</th></tr></thead><tbody id="tb-report-recent"></tbody></table></div>'
      + '</div>'
      + '<div class="g2">'
      + '<div class="card"><div class="ch"><div class="ct" data-i18n="exp_by_cat">Expense by Category</div></div><div id="lap-ke"></div></div>'
      + '<div class="card"><div class="ch"><div class="ct" data-i18n="inc_by_cat">Income by Category</div></div><div id="lap-ki"></div></div>'
      + '</div>'
      + '<div class="card"><div class="ch"><div><div class="ct" data-i18n="neraca_proj">Projection Balance</div><div class="cs" data-i18n="neraca_desc">Actual balance + all projections this period</div></div></div><div id="lap-neraca"></div></div>';
  },

  render: function(ctx) {
    setKV('lv-i', ctx.mi);
    setKV('lv-e', ctx.me);
    setKV('lv-b', ctx.bal);
    setKV('lv-p', ctx.proj);
    renderReport(ctx.sortedDB, ctx.mi, ctx.me, ctx.bal, ctx.cm, ctx.ck, ctx.proj);
    renderDashTable('tb-report-recent', ctx.sortedDB.slice(0, 8));
  }
};
