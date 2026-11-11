window.FinTrackModules = window.FinTrackModules || {};

window.FinTrackModules.outcome = {
  template: function() {
    return '<div class="card">'
      + '<div class="ch"><div><div class="ct" data-i18n="nav_outcome">Expense</div><div class="cs" data-i18n="out_desc">Expenses that have occurred</div></div><button class="btn bp bsm" onclick="openModalAs(\'expense\')"><i data-lucide="plus"></i><span data-i18n="add">Add</span></button></div>'
      + '<div class="tw"><table><thead><tr><th data-i18n="desc">Description</th><th data-i18n="account">Account</th><th data-i18n="category">Category</th><th data-i18n="date">Date</th><th data-i18n="note">Note</th><th style="text-align:right">Amount</th><th data-i18n="action">Action</th></tr></thead><tbody id="tb-e"></tbody></table></div>'
      + '</div>';
  },

  render: function(ctx) {
    renderSimple('tb-e', ctx.sortedDB.filter(function(trx){ return trx.type === 'expense'; }));
  }
};
