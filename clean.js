const fs = require('fs');
let html = fs.readFileSync('public/app.html', 'utf8');

// Remove oninput
html = html.replace(/ oninput="formatCurr\(this\)"/g, '');
html = html.replace(/ onblur="formatCurr\(this\)"/g, '');
html = html.replace(/ onkeyup="formatCurr\(this\)"/g, '');

// Remove format functions
html = html.replace(/function formatCurr\(el\) \{[\s\S]*?\n\}\n/, '');
html = html.replace(/function formatAmtForInput\(amt\) \{[\s\S]*?\n\}\n/, '');

// Fix value setters
html = html.replace(/document\.getElementById\('f-amt'\)\.value=formatAmtForInput\(t\.amt\);/g, "document.getElementById('f-amt').value=t.amt;");
html = html.replace(/document\.getElementById\('a-init'\)\.value=formatAmtForInput\(a\.init\|\|0\);/g, "document.getElementById('a-init').value=a.init||0;");

fs.writeFileSync('public/app.html', html);
console.log('Cleaned formatting successfully.');
