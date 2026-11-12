window.FinTrackModules = window.FinTrackModules || {};

window.FinTrackModules.income = {
  template: function() {
    var mob = typeof isMobileViewport === 'function' && isMobileViewport();
    var ths = mob
      ? '<th data-i18n="desc">Description</th><th data-i18n="amount">Amount</th><th data-i18n="account">Account</th><th data-i18n="category">Category</th><th data-i18n="date">Date</th><th data-i18n="note">Note</th><th data-i18n="action">Action</th>'
      : '<th data-i18n="desc">Description</th><th data-i18n="account">Account</th><th data-i18n="category">Category</th><th data-i18n="date">Date</th><th data-i18n="note">Note</th><th style="text-align:right" data-i18n="amount">Amount</th><th data-i18n="action">Action</th>';
    return '<div class="card">'
      + '<div class="ch"><div><div class="ct" data-i18n="nav_income">Income</div><div class="cs" data-i18n="inc_desc">Income that has been received</div></div><button class="btn bp bsm" onclick="openModalAs(\'income\')"><i data-lucide="plus"></i><span data-i18n="add">Add</span></button></div>'
      + '<div class="tw"><table><thead><tr>' + ths + '</tr></thead><tbody id="tb-i"></tbody></table></div>'
      + '</div>';
  },

  render: function(ctx) {
    renderSimple('tb-i', ctx.sortedDB.filter(function(trx){ return trx.type === 'income'; }));
  }
};
