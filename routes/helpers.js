const { decrypt, decryptDeterministic } = require('../services/encryption');

function decryptRow(row) {
  if (row.description) row.description = decrypt(row.description);
  if (row.cat) row.cat = decrypt(row.cat);
  if (row.note) row.note = decrypt(row.note);
  if (row.account_name) row.account_name = decrypt(row.account_name);
  if (row.type) row.type = decryptDeterministic(row.type);
  return row;
}

module.exports = { decryptRow };
