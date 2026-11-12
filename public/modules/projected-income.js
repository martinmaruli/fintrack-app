window.FinTrackModules = window.FinTrackModules || {};

window.FinTrackModules['projected-income'] = {
  template: function() {
    var mob = typeof isMobileViewport === 'function' && isMobileViewport();
    var ths = mob
      ? '<th data-i18n="desc">Description</th><th data-i18n="per_period">Per Period</th><th data-i18n="category">Category</th><th data-i18n="account">Account</th><th data-i18n="recurrence">Recurrence</th><th data-i18n="start">Start</th><th data-i18n="limit">Limit</th><th data-i18n="note">Note</th><th data-i18n="action">Action</th>'
      : '<th data-i18n="desc">Description</th><th data-i18n="category">Category</th><th data-i18n="account">Account</th><th data-i18n="recurrence">Recurrence</th><th data-i18n="start">Start</th><th data-i18n="limit">Limit</th><th data-i18n="note">Note</th><th style="text-align:right" data-i18n="per_period">Per Period</th><th data-i18n="action">Action</th>';
    return '<div class="card">'
      + '<div class="ch"><div><div class="ct" data-i18n="nav_proj_in">Projected Income</div><div class="cs" data-i18n="pi_desc">Income template: can repeat automatically</div></div><button class="btn bp bsm" onclick="openModalAs(\'projected_income\')"><i data-lucide="plus"></i><span data-i18n="add">Add</span></button></div>'
      + '<div class="tw"><table><thead><tr>' + ths + '</tr></thead><tbody id="tb-cp"></tbody></table></div>'
      + '</div>';
  },

  render: function(ctx) {
    renderCalon('tb-cp', DB.filter(function(trx){ return trx.type === 'projected_income'; }));
  }
};
