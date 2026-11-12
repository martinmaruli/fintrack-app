window.FinTrackModules = window.FinTrackModules || {};

window.FinTrackModules['projected-outcome'] = {
  template: function() {
    return '<div class="card">'
      + '<div class="ch"><div><div class="ct" data-i18n="nav_proj_out">Projected Expense</div><div class="cs" data-i18n="po_desc">Subscriptions, installments, debt: can repeat automatically</div></div><button class="btn bp bsm" onclick="openModalAs(\'projected_expense\')"><i data-lucide="plus"></i><span data-i18n="add">Add</span></button></div>'
      + '<div class="tw"><table><thead><tr><th data-i18n="desc">Description</th><th data-i18n="per_period">Per Period</th><th data-i18n="category">Category</th><th data-i18n="account">Account</th><th data-i18n="recurrence">Recurrence</th><th data-i18n="start">Start</th><th data-i18n="limit">Limit</th><th data-i18n="note">Note</th><th data-i18n="action">Action</th></tr></thead><tbody id="tb-ck"></tbody></table></div>'
      + '</div>';
  },

  render: function(ctx) {
    renderCalon('tb-ck', DB.filter(function(trx){ return trx.type === 'projected_expense'; }));
  }
};
